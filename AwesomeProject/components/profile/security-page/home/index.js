import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Button as NativeButton, ListItem, Header, Input } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";


class SecurityHome extends Component {
constructor () {
	super();

	this.state = {
		password: ""
	}
}
	button = () => {
		return (
			<View>
				<Text style={{ color: "white" }} onPress={() =>{
					this.props.navigation.navigate("home")
				}}
				title="Home">HOME</Text>
			</View>
		);
	};
	optionalButton = () => {
		return (
			<View>
				<Text style={{ color: "white" }} onPress={() =>{
					this.props.navigation.navigate("profile")
				}}
				title="Go Back">BACK</Text>
			</View>
		);
	}
	renderSubmit = () => {
		axios.put("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/update/password", {
			email: this.props.email,
			password: this.state.password
		}).then((res) => {
			console.log("RES.DATA!! :", res.data);
			alert("Password was changed successfully!")
		}).catch((err) => {
			console.log(err);
		})

		this.setState({
			password: ""
		})
	}
	render() {
		return (
			<View>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Welcome To Your Security Page', style: { color: '#fff' } }}
				  rightComponent={this.optionalButton()}/>
				<Text style={styles.text}> Welcome To Your Password Change Security Page</Text>
				<View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		password: value
		          	})
		          }} 

		          label="Change Your Password"
		          value={this.state.password}
		          placeholder='John@doe123'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		      <NativeButton onPress={() => {
		      	this.renderSubmit()
		      }} title="Submit Password Change"> </NativeButton>
		      
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputOne: {
		marginBottom: 40
	},
	text: {
		fontSize: 20, 
		fontWeight: "bold", 
		textAlign: "center", 
		marginBottom: 40,
		marginTop: 20
	}
})


const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}

export default connect(mapStateToProps, {  })(SecurityHome);