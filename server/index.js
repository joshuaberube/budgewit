import dotenv from "dotenv"
import express from "express"
import massive from "massive"
import session from "express-session"
import { editUser, getUserSession, loginUser, logoutUser, registerUser } from "./controllers/authController.js"
import { getData, addData, deleteData, editData } from "./controllers/dataController.js"
import { createPlaidLinkToken, getPlaidTransactions, createAccessToken } from "./controllers/plaidController.js"
import { checkSession } from "./middleware.js"
const app = express()
dotenv.config()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set("db", db); console.log("Connected to database!")})
.catch(err => console.log(err))


//# Data endpoints
app.get("/api/data/:tableName", getData)
app.post("/api/data/:tableName", checkSession, addData)
app.put("/api/data/:tableName/:dataId", checkSession, editData)
app.delete("/api/data/:tableName/:dataId", checkSession, deleteData)

//# User endpoints
app.post("/api/user/register", registerUser)
app.post("/api/user/login", loginUser)
app.post("/api/user/update", checkSession, editUser)
app.post("/api/user/logout", checkSession, logoutUser)
app.post("/api/user/session", checkSession, getUserSession)

//# Plaid endpoints
app.post("/api/plaid/create-link-token", checkSession, createPlaidLinkToken)
app.post("/api/plaid/create-access-token", checkSession, createAccessToken)
app.post("/api/plaid/transactions", checkSession, getPlaidTransactions)



// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || "transactions").split(",")

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(",")







// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get("/api/plaid/accounts", function (request, response, next) {
	client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
		if (error != null) {
			return response.json({
				error,
			})
		}
		response.json(accountsResponse)
	})
})

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))