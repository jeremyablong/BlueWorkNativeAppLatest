import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Header, Input } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text as Texttt } from 'native-base';
import { addMessagesToStore, savePropsData } from "../../../actions/index.js";


class MessagesHome extends Component {
constructor () {
	super();

	this.state = {
		data: [],
		message: "",
		passDownData: []
	}
}
	button = () => {
		return (
			<View>
				{/*<Button title="Home" onPress={() => {
					this.props.navigation.navigate("home")
				}}></Button>*/}
				<Text style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("home")
				}}>BACK</Text>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				{/*<Button title="Back" onPress={() => {
					this.props.navigation.navigate("home")
				}}></Button>*/}
			</View>
		);
	}
	componentDidMount() {
		console.log("mounted")
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/get/all/messages", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				data: res.data
			}, () => {
				console.log("This is the homepage for this.state.data", this.state.data)
			})
			console.log(res.data);
		}).catch((err) => {
			console.log(err.response);
		});

		
		

		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	uuid: propsData.uuid,
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	}, () => {
		// 		this.props.addMessagesToStore(this.state.passDownData);
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })
	}
	handleSubmit = () => {
		console.log("clicked.")
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/get/all/messages", {
			email: this.props.email
		}).then((res) => {
			console.log("THEN")
			this.setState({
				data: res.data
			}, () => {
				console.log("This is the homepage for this.state.data", this.state.data)
			})
			console.log(res.data);
		}).catch((err) => {
			console.log(err.response);
		});

		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	uuid: propsData.uuid,
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	}, () => {
		// 		this.props.addMessagesToStore(this.state.passDownData);
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })

	}
	renderPageChangeApiCall = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/convo/false", {
			email: this.props.email
		}).then((res) => {
			this.props.savePropsData(res.data);
		}).catch((err) => {
			console.log(err.response);
		})
	}
	renderMap = () => {
		let alreadySeen = [];
		if (this.state.data) {
			return this.state.data.map((item, index) => {

				if (item.messages) {
					return item.messages.reverse().map((i, idx) => {
						alreadySeen.push(i);
						if (i.initialMessage === true) {
							console.log("I think this will do the trick:", i)
							return (
					            <ListItem onPress={() => {
									this.props.navigation.navigate("chat_individual", { data: i })
									this.renderPageChangeApiCall()
					            }} key={idx} avatar>
					              <Left>
					               {/* <Thumbnail source={{ uri: 'Image URL' }} />*/}
					              </Left>
					              <Body>
					                <Texttt>{`${i.firstName ? i.firstName : "No Name Provided."} ${i.lastName ? i.lastName : ""}`}</Texttt>
					                <Texttt note>{i.message}</Texttt>
					              </Body>
					              <Right>
					                <Texttt note>{i.timestamp}</Texttt>
					              </Right>
					            </ListItem>
							);
						}
					})
				}
					
				// for (let key in item) {
				// 	let element = item[key];
				// 	console.log("ELEMENT EMAIL", element)
				// 	if (Array.isArray(element)) {
				// 		return element.map((i, idx) => {
				// 			console.log("i", i.responses);
				// 			if (i.responses) {
				// 				return null;
				// 			} else {
								// return (
						  //           <ListItem onPress={() => {
								// 		this.props.navigation.navigate("chat_individual", { data: i })
						  //           }} key={idx} avatar>
						  //             <Left>
						  //              {/* <Thumbnail source={{ uri: 'Image URL' }} />*/}
						  //             </Left>
						  //             <Body>
						  //               <Texttt>{`${i.firstName ? i.firstName : "No Name Provided."} ${i.lastName ? i.lastName : ""}`}</Texttt>
						  //               <Texttt note>{i.message}</Texttt>
						  //             </Body>
						  //             <Right>
						  //               <Texttt note>{i.timestamp}</Texttt>
						  //             </Right>
						  //           </ListItem>
								// );

				// 			}
				// 		}) 
				// 	}
				// }
			})
		}
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Chat Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
				<Button style={{ paddingTop: 10 }} onPress={() => {
					this.handleSubmit()
				}} title="Gather Messages!"></Button>
				{/*<Text style={styles.title}> Scroll to bottom of screen for your latest messages! </Text>*/}
				{/*<ChannelScreen />*/}
				<ScrollView>

				{this.renderMap()}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 20,
		textAlign: "center"
	}
})

const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}
export default connect(mapStateToProps, { addMessagesToStore, savePropsData })(MessagesHome);