export { getBudgets, addBudget, editBudget, deleteBudget };

const getBudgets = async (req, res) => {
	try {
		const db = req.app.get("db");

		let budgets = [];
		budgets = await db.get_budgets([+req.params.id]);
		res.status(200).send(budgets);
	} catch (err) {
		console.log(err);
	}
};

const addBudget = async (req, res) => {
	try {
		const db = req.app.get("db");
		let {
			budget_name,
			budget_category,
			budget_max,
			budget_current,
			user_id,
		} = req.body;

		let budget = await db.add_budget([
			budget_name,
			budget_category,
			budget_max,
			budget_current,
			user_id,
		]);
		res.status(200).send(budget);
	} catch (err) {
		console.log(err);
	}
};

const editBudget = async (req, res) => {
	try {
		const db = req.app.get("db");

		let { budget_name, budget_category, budget_max, budget_current } = req.body;

		let budget_id = +req.params.id;

		let budget = await db.update_budget([
			budget_name,
			budget_category,
			budget_max,
			budget_current,
			budget_id,
		]);
		res.status(200).send("record updated");
	} catch (err) {
		console.log(err);
	}
};

const deleteBudget = async (req, res) => {
	try {
		const db = req.app.get("db");
		let budget_id = +req.params.id;
		await db.delete_budget(budget_id);
		res.status(200).send("budget deleted");
	} catch (err) {
		console.log(err);
	}
};
