export { getTransactions, addTransaction, editTransaction, deleteTransaction };

const getTransactions = async (req, res) => {
	try {
		const db = req.app.get("db");

		let transactions = [];
		transactions = await db.get_transactions([+req.params.id]);
		res.status(200).send(transactions);
	} catch (err) {
		console.log(err);
	}
};

const addTransaction = async (req, res) => {
	try {
		const db = req.app.get("db");
		let {
			transaction_amount,
			transaction_category,
			transaction_date,
			iso_currency_code,
			pending,
			transaction_title,
			transaction_desc,
			user_id,
		} = req.body;

		let transaction = await db.add_transaction([
			transaction_amount,
			transaction_category,
			transaction_date,
			iso_currency_code,
			pending,
			transaction_title,
			transaction_desc,
			user_id,
		]);
		res.status(200).send(transaction);
	} catch (err) {
		console.log(err);
	}
};

const editTransaction = async (req, res) => {
	try {
		const db = req.app.get("db");

		let {
			transaction_amount,
			transaction_category,
			transaction_date,
			iso_currency_code,
			pending,
			transaction_title,
			transaction_desc,
		} = req.body;

		let transaction_id = +req.params.id;

		let transaction = await db.update_transaction([
			transaction_amount,
			transaction_category,
			transaction_date,
			iso_currency_code,
			pending,
			transaction_title,
			transaction_desc,
			transaction_id,
		]);
		res.status(200).send("record deleted");
	} catch (err) {
		console.log(err);
	}
};

const deleteTransaction = async (req, res) => {
	try {
		const db = req.app.get("db");
		let transaction_id = +req.params.id;
		await db.delete_transaction(transaction_id);
		res.status(200).send("transaction deleted");
	} catch (err) {
		console.log(err);
	}
};
