import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text as Texttt, Dimensions, StyleSheet, Button as Buttonnn, TouchableHighlight, ImageBackground, TouchableOpacity } from "react-native";
import { Container, Headerrr, Content, Footer, FooterTab, Button, Text,  Card, CardItem, Body, List, Textarea } from 'native-base';
import { SearchBar, ListItem, Header, Button as ElementsButton, Icon  } from "react-native-elements";
import uuid from "react-uuid";

class ModalMap extends Component {
constructor () {
	super();

	this.state = {
		message: "",
		date: null,
		data: [],
		dataSetTwo: [],
		isModalVisible: false
	}
}
	renderSubmit = () => {

		const generateUUID = uuid();


		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
			email: this.props.email
		}).then((res) => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/initial/message", {
				self: propsData.email,
				email: this.props.email,
				message: this.state.message, 
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				jobHistory: res.data,
				category: propsData.category,
				hourly: propsData.hourly,
				workerCount: propsData.workerCount,
				phoneNumber: propsData.phoneNumber,
				streetAddress: propsData.streetAddress,
				city: propsData.city,
				zipCode: propsData.zipCode,
				uuid: generateUUID
			}).then((res) => {
				this.setState({
					data: res.data,
					isModalVisible: false
				}, () => {
					alert("You've successfully messaged this employer!");
				})
			}).catch((err) => {
				console.log(err);
			})
				
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/backlash/message", {
				self: this.props.email,
				email: propsData.email,
				message: this.state.message,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				jobHistory: res.data,
				category: propsData.category,
				hourly: propsData.hourly,
				workerCount: propsData.workerCount,
				phoneNumber: propsData.phoneNumber,
				streetAddress: propsData.streetAddress,
				city: propsData.city,
				zipCode: propsData.zipCode,
				uuid: generateUUID
			}).then((res) => {
				this.setState({
					dataSetTwo: res.data
				}, () => {
					console.log(this.state.dataSetTwo);
				})
			}).catch((err) => {
				console.log(err);
			})
		}).catch((err) => {
			console.log(err.response);
		});
	}
	button = () => {
		return (
			<View>
				<Buttonnn title="Back" onPress={() => {
					this.setState({
						isModalVisible: false
					})
				}}></Buttonnn>
			</View>
		);
	}
	nextPage = () => {
		return null;
	}
	render() {
		return (
			<View>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Chat Message Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: 'white',
	    alignItems: 'center',
	    justifyContent: 'center'
    },
    contentContainer: {
        flex: 1 // pushes the footer to the end of the screen
    },
    background: {
	    flex: 1,
	    minHeight: "100%",
	    height: "100%",
	    width: "100%",
	    height: Dimensions.get('window').height
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
		email: state.userData.data.email,
		otherUserEmail: state.jobHistory.data
	}
}
export default connect(mapStateToProps, {  })(ModalMap);