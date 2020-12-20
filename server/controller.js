export { getTransactions, addTransaction };

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
