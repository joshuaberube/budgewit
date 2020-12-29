
import dotenv from "dotenv";
import express from "express";
import massive from "massive";
import moment from "moment";
import { getData, addData, deleteData, editData } from "./controllers/dataController.js";
import plaid from "plaid";
const app = express();

const {
	SERVER_PORT,
	CONNECTION_STRING,
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_REDIRECT_URI,
} = process.env;

dotenv.config();

app.use(express.json())
// app.use(session())

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set("db", db); console.log("Connected to database!")})
.catch(err => console.log(err))

app.get("/api/data/:tableName", getData)
app.post("/api/data/:tableName", addData)
app.put("/api/data/:tableName/:dataId", editData)
app.delete("/api/data/:tableName/:dataId", deleteData)

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || "transactions").split(
	","
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
	","
);

const client = new plaid.Client({
	clientID: PLAID_CLIENT_ID,
	secret: PLAID_SECRET,
	env: plaid.environments.sandbox,
});

// console.log("client: ", client);

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post("/api/create_link_token", function (request, response, next) {
	const configs = {
		user: {
			// This should correspond to a unique id for the current user. Therefore I should change the
			// path to include usernama or user id and take this information from the params
			client_user_id: "user 1",
		},
		client_name: "Plaid Quickstart",
		products: PLAID_PRODUCTS,
		country_codes: PLAID_COUNTRY_CODES,
		language: "en",
	};

	if (PLAID_REDIRECT_URI !== "http://localhost:3060") {
		configs.redirect_uri = PLAID_REDIRECT_URI;
	}

	client.createLinkToken(configs, function (error, createTokenResponse) {
		console.log("creating link token");
		if (error != null) {
			console.log("error: ", error);
			return response.json({
				error: error,
			});
		}
		response.json(createTokenResponse);
	});
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post(
	"/api/set_access_token/:public_token",
	function (request, response, next) {
		console.log("exchanging token");
		console.log("request.params.public_token", request.params.public_token);
		const PUBLIC_TOKEN = request.params.public_token;
		console.log("PUBLIC_TOKEN", PUBLIC_TOKEN);
		client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
			if (error != null) {
				return response.json({
					error,
				});
			}
			const ACCESS_TOKEN = tokenResponse.access_token;
			const ITEM_ID = tokenResponse.item_id;

			response.json({
				access_token: ACCESS_TOKEN,
				item_id: ITEM_ID,
				error: null,
			});
		});
	}
);

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get("/api/plaid/accounts", function (request, response, next) {
	client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
		if (error != null) {
			return response.json({
				error,
			});
		}
		response.json(accountsResponse);
	});
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get(
	"/api/plaid/transactions/:ACCESS_TOKEN",
	function (request, response, next) {
		// Pull transactions for the Item for the last 30 days
		const ACCESS_TOKEN = request.params.ACCESS_TOKEN;
		console.log("ACCESS_TOKEN: ", ACCESS_TOKEN);
		const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
		const endDate = moment().format("YYYY-MM-DD");
		client.getTransactions(
			ACCESS_TOKEN,
			startDate,
			endDate,
			{
				count: 250,
				offset: 0,
			},
			function (error, transactionsResponse) {
				if (error != null) {
					return response.json({
						error,
					});
				} else {
					response.json(transactionsResponse);
				}
			}
		);
	}
);


app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))