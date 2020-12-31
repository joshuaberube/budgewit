import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

class BankLink extends Component {
	constructor() {
		super();

		this.state = {
			accounts: [],
			transactions: [],
			rtransactions: [],
			categories: [],
			linkToken: {
				expiration: "",
				link_token: "",
				request_id: "",
				status_code: null,
			},
			public_token: "",
			access_token: "",
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleOnSuccess = this.handleOnSuccess.bind(this);
		this.compareValues = this.compareValues.bind(this);
		this.transformer = this.transformer.bind(this);
	}

	async componentDidMount() {
		try {
			const linkToken = await axios.post("/api/create_link_token");

			this.setState({
				linkToken: linkToken.data,
			});
		} catch (err) {
			console.log(err);
		}
	}

	compareValues(key, order = "asc") {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// property doesn't exist on either object
				return 0;
			}

			const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
			const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return order === "desc" ? comparison * -1 : comparison;
		};
	}

	transformer(source_transaction, user_id) {
		let target_transaction = {};
		target_transaction["transaction_id"] = source_transaction["transaction_id"];

		target_transaction["transaction_amount"] = source_transaction["amount"];

		target_transaction["transaction_category"] =
			source_transaction["category"][0];
		target_transaction["transaction_date"] = source_transaction["date"];
		target_transaction["iso_currency_code"] =
			source_transaction["iso_currency_code"];
		target_transaction["pending"] = source_transaction["pending"];
		target_transaction["transaction_title"] = source_transaction["name"];
		target_transaction["transaction_desc"] = source_transaction["category"][1];
		target_transaction["user_id"] = user_id;
		return target_transaction;
	}

	getCategories(transactions) {
		let categories = {};
		categories[transactions[0].category[0]] = transactions[0].amount;

		for (let i = 1; i < transactions.length; i++) {
			if (transactions[i].category[0] === transactions[i - 1].category[0]) {
				categories[transactions[i].category[0]] =
					categories[transactions[i].category[0]] + transactions[i].amount;
			} else {
				categories[transactions[i].category[0]] = transactions[i].amount;
			}
		}
		return categories;
	}

	async handleOnSuccess(token, metadata) {
		try {
			const public_token = metadata.public_token;

			let response = await axios.post(`/api/set_access_token/${public_token}`);
			const access_token = response.data.access_token;
			this.setState({
				access_token: access_token,
			});
		} catch (err) {
			console.log(err);
		}
	}

	handleOnExit() {
		// handle the case when your user exits Link
		// For the sake of this tutorial, we're not going to be doing anything here.
	}

	async handleClick(res) {
		let ACCESS_TOKEN = this.state.access_token;
		res = await axios.get(`/api/plaid/transactions/${ACCESS_TOKEN}`);
		//****************temporary code***********************
		let user_id = 1;
		//****************temporary code***********************
		let sortedTransactions = [...res.data.transactions];
		let reformatTransactions = [];
		for (let i = 0; i < res.data.transactions.length; i++) {
			reformatTransactions.push(
				this.transformer(res.data.transactions[i], user_id)
			);
		}
		console.log("reformatTransactions: ", reformatTransactions);
		sortedTransactions.sort(this.compareValues("category"));
		let categories = this.getCategories(sortedTransactions);
		this.setState({
			accounts: res.data.accounts,
			transactions: res.data.transactions,
			categories: categories,
			rtransactions: reformatTransactions,
		});
	}

	render() {
		return (
			<div>
				<PlaidLink
					clientName="React Plaid Setup"
					env="sandbox"
					product={["auth", "transactions"]}
					token={this.state.linkToken.link_token}
					onExit={this.handleOnExit}
					onSuccess={this.handleOnSuccess}
				>
					Open Link and connect your bank!
				</PlaidLink>

				<div>
					<button onClick={this.handleClick}>
						Get Accounts and Transactions
					</button>
					<div>
						<h2>Accounts</h2>
						{this.state.accounts.map((account, index) => (
							<div key={index}>
								{" "}
								{account.name} avail bal $
								{parseFloat(account.balances.available, 10).toFixed(2)} curr bal{" "}
								${parseFloat(account.balances.current, 10).toFixed(2)}
							</div>
						))}
						<h2>Transactions</h2>
						{this.state.transactions.map((transaction, index) => (
							<div key={index}>
								{" "}
								<b>date: </b>
								{transaction.date} <b>amount:</b>$
								{parseFloat(transaction.amount, 10).toFixed(2)} <b>category:</b>{" "}
								{transaction.category[0]} <b>merchant:</b>{" "}
								{transaction.merchant_name}
							</div>
						))}
						<h2>Money spent by categories</h2>
						{Object.keys(this.state.categories).map((key, i) => (
							<p key={i}>
								<span>
									{" "}
									<b>Category: </b>
									{key}{" "}
								</span>
								<span>
									{" "}
									<b>Amount spent:</b> $
									{parseFloat(this.state.categories[key], 10).toFixed(2)}
								</span>
							</p>
						))}{" "}
						;
					</div>
				</div>
			</div>
		);
	}
}

export default BankLink;
