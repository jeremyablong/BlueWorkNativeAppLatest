import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Button as NativeButton, ListItem } from "react-native-elements";
import { store } from "../../../store/store.js";
import { connect } from "react-redux";

class ProfileMainHelper extends Component {

	renderContent = () => {
		if (this.props.firstName && this.props.lastName && this.props.email && this.props.password) {
			return (
			<ScrollView>
				<ListItem 
				onPress={() => {
					this.props.navigation.navigate("signup_business_account")
				}}
				  	titleStyle={{ color: 'red', fontWeight: 'bold' }}
					style={{ color: "red" }}
			        title="CREATE AND POST A JOB - CREATE JOB POSTING"
			        subtitle="Follow this link to access to post a job on our job board"
			        bottomDivider
			      />
				<ListItem
			        title="Manage About Me Section"
			        subtitle="Follow this link to access things such as your bio, interests, or anything you'd like to tell to our employers"
			        bottomDivider 
			        onPress={() => {
						this.props.navigation.navigate("profile_about")
			        }}
			      />
			      <ListItem
			        title="Manage Your Security Settings"
			        subtitle="Follow this link to access things such as email, password, etc..." 
			        onPress={() => {
			        	this.props.navigation.navigate("profile_security")
			        }}
			        bottomDivider
			      />
			      <ListItem 
			      onPress={() => {
			      	this.props.navigation.navigate("job_history")
			      }}
			        title="Create Your Job History"
			        subtitle="Follow this link to update your job/employment history so employers can see your experience"
			        bottomDivider
			      />
			      <ListItem
			        title="Get Help"
			        subtitle="Follow this link to access help."
			        bottomDivider
			      />
			      <ListItem
			        title="View your messages"
			        subtitle="Follow this link to access your messages"
			        bottomDivider 
			        onPress={() => {
			        	this.props.navigation.navigate("messages_home")
			        }}
			      />
			     {/* <ListItem
			        title="Manage Main Account Details"
			        subtitle="Follow this link to access things such as email, password, etc..."
			        bottomDivider
			      />
			     
			      <ListItem
			        title="Manage Main Account Details"
			        subtitle="Follow this link to access things such as email, password, etc..."
			        bottomDivider
			      />
			      <ListItem
			        title="Manage Main Account Details"
			        subtitle="Follow this link to access things such as email, password, etc..."
			        bottomDivider
			      />
			      <ListItem
			        title="Manage Main Account Details"
			        subtitle="Follow this link to access things such as email, password, etc..."
			        bottomDivider
			      />
			      <ListItem
			        title="Manage Main Account Details"
			        subtitle="Follow this link to access things such as email, password, etc..."
			        bottomDivider
			      />*/}
			</ScrollView>
			);
		}
	}
	render() {
		const { firstName, lastName, email, password } = this.props;
		return (
		<View>
			<Text style={styles.welcomeText}> {firstName && lastName && email && password ? `Welcome To Your Profile ${firstName} ${lastName}!`: "You are not authorized to access this page. Please sign into your account."}</Text>
			{this.renderContent()}
		</View>
		);
	}
}
const styles = StyleSheet.create({
	welcomeText: {
		fontSize: 18,
		textAlign: "center",
		color: "white",
		fontWeight: "bold",
		backgroundColor: "black",
		paddingTop: 10,
		paddingBottom: 20
	}
});

const mapStateToProps = (state)  => {
	return {
		firstName: state.userData.data.firstName,
		lastName: state.userData.data.lastName,
		email: state.userData.data.email,
		password: state.userData.data.password
	}
}


export default connect(mapStateToProps, {  })(ProfileMainHelper);
