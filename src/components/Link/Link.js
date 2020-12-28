import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

class Link extends Component {
	constructor() {
		super();

		this.state = {
			accounts: [],
			transactions: [],
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
	}

	async componentDidMount() {
		try {
			const linkToken = await axios.post("/api/create_link_token");
			console.log("linkToken: ", linkToken.data);
			this.setState({
				linkToken: linkToken.data,
			});
		} catch (err) {
			console.log(err);
		}
	}

	async handleOnSuccess(token, metadata) {
		try {
			const public_token = metadata.public_token;
			console.log("public_token: ", public_token);
			let response = await axios.post(`/api/set_access_token/${public_token}`);
			const access_token = response.data.access_token;
			this.setState({
				access_token: access_token,
			});
			console.log("this.state.access_token: ", this.state.access_token);
		} catch (err) {
			console.log(err);
		}
	}

	handleOnExit() {
		// handle the case when your user exits Link
		// For the sake of this tutorial, we're not going to be doing anything here.
	}

	handleClick(res) {
		let ACCESS_TOKEN = this.state.access_token;
		axios.get(`/api/plaid/transactions/${ACCESS_TOKEN}`).then((res) => {
			this.setState({
				accounts: res.data.accounts,
				transactions: res.data.transactions,
			});
			console.log("res.data: ", res.data);
			console.log("this.state.transactions: ", this.state.transactions);
			console.log("this.state.accounts: ", this.state.accounts);
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
					<button onClick={this.handleClick}>Get Transactions</button>
				</div>
			</div>
		);
	}
}

export default Link;
