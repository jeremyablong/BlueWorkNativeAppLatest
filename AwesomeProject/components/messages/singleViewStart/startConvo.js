import React, { Component } from 'react';
import { Text as NativeText, View, StyleSheet, Button as NativeButton, ScrollView, Image, Dimensions } from "react-native";
import { Header as Head, Button as ElementsButton, Card, Icon, Text } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import { GiftedChat } from 'react-native-gifted-chat';
import { Textarea } from "native-base";
import Moment from 'react-moment';


class StartIndividualConvo extends Component {
constructor () {
	super();

	this.state = {
		propsData: null,
		data: [],
		date: null,
		timestamp: null,
		dataSetTwo: []
	}
}
	button = () => {
		return (
			<View>
				<Text style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("home")
				}}>HOME</Text>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				{/*<NativeButton title="Back" onPress={() => {
					this.props.navigation.navigate("profile")
				}}></NativeButton>*/}
			</View>
		);
	}
	componentDidMount () {
		const { navigation } = this.props;
		const propsData = navigation.getParam("dataToMessage", "NO-ID");

		this.setState({
	      	propsData
	    });

	}
	renderSubmit = () => {
		const { navigation } = this.props;
		const propsData = navigation.getParam("dataToMessage", "NO-ID");

		const date = new Date();
		let minute = date.getMinutes();
		let hour = date.getHours();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		
		let minutesCalc = (minute.length === 1) ? "0" + minute : minute ;

		let hours = date.getHours() % 12 || 12; 

		let ampm = (hours >= 12) ? "PM" : "AM";

		const finalTime = month + "/" + day + "/" + year + " " + hour + ":" + minutesCalc + " " +  ampm;

		console.log("Submit Clicked, this is propsData :", propsData);
		this.setState({
			timestamp: finalTime
		}, () => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/initial/message", {
				uuid: propsData.uuid,
				email: this.state.propsData.email,
				message: this.state.message, 
				timestamp: this.state.timestamp,
				firstName: this.props.firstName,
				lastName: this.props.lastName
			}).then((res) => {
				this.setState({
					data: res.data
				})
			}).catch((err) => {
				console.log("ERROR NUMBER ONE.")
			})
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/backlash/message", {
				uuid: propsData.uuid,
				self: this.props.email,
				message: this.state.message, 
				timestamp: this.state.timestamp,
				firstName: this.props.firstName,
				lastName: this.props.lastName
			}).then((res) => {
				this.setState({
					dataSetTwo: res.data
				}, () => {
					console.log(this.state.dataSetTwo);
				})
			}).catch((err) => {
				console.log("ERROR NUMBER TWO.")
				console.log(err);
			})
		})
		// http://10.0.2.2:5000/employment/gather/history
		
	}
	render() {
		console.log(this.state)
		console.log("PASSED DOWN PROPSDATA :", this.state.propsData);
		return (
		<View style={styles.container}>
				<Head
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Chat Message Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
		   {/* <View style={styles.contentContainer}> 
			

	
		    </View>*/}

		 

		    <View style={styles.footer}>
		        <Textarea onChangeText={(value) => {
		        	this.setState({
		        		message: value,
		        		date: new Date()
		        	})
		        }} rowSpan={5} bordered placeholder="Hi Tom, Are we still on for tomorrow at 8:00am? Send a message today!" />
			        <ElementsButton 
			          onPress={() => {
			            this.renderSubmit()
			          }}
			          title="Send Message...!" 
			          style={styles.submitBtn}
			        >

		        	</ElementsButton>
		    </View>
		</View>
		);
	};
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleWrapper: {

    },
    inputWrapper: {

    },
    contentContainer: {
        flex: 1 // pushes the footer to the end of the screen
    },
    footer: {
    	width: "100%",
        position: "absolute",
        bottom: 0
    }
})

const mapStateToProps = (state) => {
	return {
		firstName: state.userData.data.firstName,
		lastName: state.userData.data.lastName,
		email: state.userData.data.email
	}
}

export default connect(mapStateToProps, {  })(StartIndividualConvo);