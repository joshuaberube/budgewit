import dotenv from "dotenv";
import express from "express";
import massive from "massive";

import {
	getTransactions,
	addTransaction,
	editTransaction,
	deleteTransaction,
} from "./controller.js";

const app = express();
dotenv.config();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
})
	.then((db) => {
		app.set("db", db);
		console.log("Connected to database!");
	})
	.catch((err) => console.log(err));

app.get("/api/transactions/get/:id", getTransactions);

app.post("/api/transactions/add", addTransaction);

app.put("/api/transactions/edit/:id", editTransaction);

app.delete("/api/transactions/delete/:id", deleteTransaction);

app.listen(SERVER_PORT, () =>
	console.log(`Server listening on port ${SERVER_PORT}.`)
);
