import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

class Link extends Component {
	constructor() {
		super();

		this.state = {
			accounts: [],
			transactions: [],
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

		let sortedTransactions = [...res.data.transactions];

		sortedTransactions.sort(this.compareValues("category"));
		let categories = this.getCategories(sortedTransactions);
		this.setState({
			accounts: res.data.accounts,
			transactions: res.data.transactions,
			categories: categories,
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
								{account.name} avail bal {account.balances.available} curr bal{" "}
								{account.balances.current}
							</div>
						))}
						<h2>Transactions</h2>
						{this.state.transactions.map((transaction, index) => (
							<div key={index}>
								{" "}
								<b>date: </b>
								{transaction.date} <b>amount:</b>
								{transaction.amount} <b>category:</b> {transaction.category[0]}{" "}
								<b>merchant:</b> {transaction.merchant_name}
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
									<b>Amount spent:</b> {this.state.categories[key]}
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

export default Link;
