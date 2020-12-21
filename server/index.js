import dotenv from "dotenv";
import express from "express";
import massive from "massive";

import {
	getTransactions,
	addTransaction,
	editTransaction,
	deleteTransaction,
} from "./transactionsController.js";

import {
	getBudgets,
	addBudget,
	editBudget,
	deleteBudget,
} from "./budgetController.js";

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

// transaction REST calls

app.get("/api/transactions/get/:id", getTransactions);

app.post("/api/transactions/add", addTransaction);

app.put("/api/transactions/edit/:id", editTransaction);

app.delete("/api/transactions/delete/:id", deleteTransaction);

// budget REST calls

app.get("/api/budgets/get/:id", getBudgets);

app.post("/api/budgets/add", addBudget);

app.put("/api/budgets/edit/:id", editBudget);

app.delete("/api/budgets/delete/:id", deleteBudget);

app.listen(SERVER_PORT, () =>
	console.log(`Server listening on port ${SERVER_PORT}.`)
);
