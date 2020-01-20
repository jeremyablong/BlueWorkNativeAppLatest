import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Input, Button as ElementsButton } from 'react-native-elements';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import { createUser } from "../../actions/index.js";
import { connect } from "react-redux";
import publicIP from 'react-native-public-ip';
import { sendbirdLogin } from "../../actions/sendBirdLogin.js";



Icon.loadFont();


class LoginHelper extends Component {
constructor () {
	super();

	this.state = {
		email: "",
		password: "",
		message: "",
		ipAddress: null,
		errorMessage: ""
	}
}

	renderSubmit = async () => {

		axios.post(`https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/login`, {
			email: this.state.email.toLowerCase(),
			password: this.state.password
		}).then((res) => {
			console.log(res.data);
			// if (res.data.message === "User does NOT exist.") {
			// 	this.setState({
			// 		errorMessage: "Please enter valid credentials."
			// 	})
			// }
			console.log("This is the res.data :", res.data)
			if (res.data) {
				this.setState({
					message: res.data.message
				}, () => {
					if (this.state.message === "User exists!") {
						this.props.createUser(res.data.data);
						this.props.sendbirdLogin({ 
							userId: res.data.data.userId, 
							nickname: res.data.data.firstName + " " + res.data.data.lastName 
						});
						this.setState({
							email: "",
							password: ""
						});
						this.props.navigation.navigate("home");
					} else {
						alert("Please enter valid credentials.")
					}
				})
			}

		}).catch((err) => {
			console.log(err);
			alert(err);
		})
		


	}
	componentDidMount() {
		publicIP().then((ip) => {    
		  console.log("ip address :", ip);
		  this.setState({
		  	ipAddress: ip
		  })
		  // '47.122.71.234'
		}).catch(error => {
		  console.log(error);
		  // 'Unable to get IP address.'
		});
	}
	render () {
		console.log(this.state);
		// NetworkInfo.getIPAddress(ip => {
		//   console.log("IP Address :", ip);
		// });
		// console.log("ipv4Address", ipv4Address)
		return (
		<ImageBackground source={require("../../images/building-two.jpg")} style={styles.background}>
			<View>
				<Text style={styles.text}>Please Sign-In To Access Your Account</Text>
			<View style={styles.inputOneView}>
				<Input
					onChangeText={(data) => {
					  	this.setState({
					  		email: data
					  	}, () => {
					  		console.log("Email is :", this.state.email)
					  	})
					}}
				  value={this.state.email}
				  placeholder='youremailhere@gmail.com'
				  leftIcon={
				    <Icon
				      name="email"
				      size={24}
				      color='black'
					/>}
				/>
			</View>
				<View style={styles.inputTwoView}>
					<Input 
					  value={this.state.password}
					  onChangeText={(data) => {
					  	this.setState({
					  		password: data
					  	}, () => {
					  		console.log("Password is :", this.state.password)
					  	})
					  }}
					  secureTextEntry={true}
					  placeholder='Please enter your password here' 
					  leftIcon={
					    <Icon
					      name="aircraft-take-off"
					      size={24}
					      color='black'
						/>}
					/>
				</View>
				<View>
				<ElementsButton onPress={() => {
					this.renderSubmit()
					}} 
					style={styles.submitBtn} 
					title="Submit credentials" 
				> </ElementsButton>
				</View>
			</View>
		</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 24,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: 20,
		color: "white"
	},
	passwordInput: {

	},
	background: {
	    flex: 1,
	    minHeight: "100%",
	    height: "100%",
	    width: Dimensions.get('window').width,
  		height: Dimensions.get('window').height
	},
	inputTwoView: {
		marginTop: 20,
		backgroundColor: "white",
		marginBottom: 20
	},
	inputOneView: {
		marginTop: "30%",
		backgroundColor: "white"
	},
	submitBtn: {
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center"
	}
})

export default connect(null, { createUser, sendbirdLogin })(LoginHelper);