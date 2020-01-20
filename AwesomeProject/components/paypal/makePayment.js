import React, { Component } from 'react'
import { View, Text } from "react-native";
import axios from "axios";
import { Button as ElementsButton } from "react-native-elements";

class MakePaypalPayment extends Component {
constructor(props) {
  super(props);

  this.state = {

  };
}
	requestPayment = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/stripe/signup/business", { 
			email: this.props.email,
			businessName: this.state.businessName,
			category: this.state.category,
			hourly: this.state.hourly,
			workerCount: this.state.workerCount,
			jobDescription: this.state.jobDescription.toLowerCase(),
			email: this.props.email,
			phoneNumber: this.state.phoneNumber,
			streetAddress: this.state.streetAddress.toLowerCase(),
			zipCode: this.state.zipCode,
			city: this.state.city.toLowerCase()
		  }).then((res) => {
			console.log(res.data);
			this.setState({
				businessName: "",
				category: "",
				hourly: "",
				workerCount: "",
				jobDescription: "",
				email: "",
				phoneNumber: "",
				streetAddress: "",
				zipCode: "",
				city: ""
			}, () => {
				alert("You've successfully posted this job!")
			})
		  }).catch((err) => {
		  	console.log(err);
		  })
	}
	render() {
		return (
			<View>
				<ElementsButton onPress={() => {
					this.requestPayment()
				}} style={{ marginTop: 20, marginBottom: 20 }} title="Make A $1.99 Payment To Create A Job Posting"></ElementsButton>
			</View>
		)
	}
}


export default MakePaypalPayment;