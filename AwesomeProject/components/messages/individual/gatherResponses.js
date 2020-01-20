import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, ImageBackground, Button } from "react-native";
import axios from "axios";
import { Container, Header, Content, Card, CardItem, Text as NativeText, Body, Textarea } from "native-base";
import { Button as ElementsButton, Header as Head } from "react-native-elements";
import Modal from "react-native-modal";
import { saveEmail } from "../../../actions/index.js";
import { connect } from "react-redux";
import { store } from "../../../store/store.js";

class GatherResponses extends Component {
constructor () {
	super();

	this.state = {
		data: [],
		dataSetTwo: [],
		showReply: false,
		message: "",
		date: null,
		responseData: [],
		passDownData: [],
		loaded: true
	}
}
	componentDidMount () {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/convo/false", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				passDownData: res.data
			})
		}).catch((err) => {
			console.log(err.response);
		})
		// const { navigation } = this.props;
		// // const propsData = navigation.getParam("data", "NO-ID");
		
		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	});
		// }).catch((err) => {
		// 	console.log(err.response);
		// })
		// // this.props.saveEmail(this.props.propsData.email);

		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		data: res.data
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// });
	}
	button = () => {
		return (
			<View>
				<Button title="BACK" onPress={() => {
					this.setState({
						showReply: false
					})
				}}></Button>
			</View>
		);
	}
	nextPage = () => {
		
	}
	handleUpdate = () => {
		// const { navigation } = this.props;
		// const propsData = navigation.getParam("data", "NO-ID");
		if (this.state.showReply) {
			return (
			 	<Modal isVisible={this.state.showReply}>
			 	
 					<View style={styles.container}>
						<Head
						  style={styles.nav}
						  leftComponent={this.button()}
						  centerComponent={{ text: 'Chat Message Homepage', style: { color: '#fff' } }}
						  rightComponent={this.nextPage()}
						/>
						<ImageBackground source={require("../../../images/matrix.jpg")} style={styles.background}>
					   
						
						</ImageBackground>
					    <View style={styles.footer}>
					        <Textarea onChangeText={(value) => {
					        	this.setState({
					        		message: value,
					        		date: new Date()
					        	})
					        }} rowSpan={5} bordered style={{ backgroundColor: "white" }} placeholder="Hi Tom, Are we still on for tomorrow at 8:00am? Send a message today!" />
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
					
				</Modal>
	  		);
		}
	}
	renderContent = () => {
		// const { navigation } = this.props;
		// const propsData = navigation.getParam("data", "NO-ID");
		// if (this.props.passed) {
		// 	return this.props.passed.map((i, idx) => {
		// 		let reversed = i.messages.reverse();
		// 		if (reversed) {
		// 			return reversed.map((item, index) => {
		// 				if (item.uuid === this.props.propsData.uuid) {
		// 					if (item.initialMessage === false) {
		// 						return (
		// 							<Card key={index}>
		// 					            <CardItem header bordered>
		// 					              <NativeText>{`${item.firstName ? item.firstName : "No Name Provided."} ${item.lastName ? item.lastName : ""}`}</NativeText>
		// 					            </CardItem>
		// 					            <CardItem bordered>
		// 					              <Body>
		// 					              <View
		// 									  style={{
		// 									    borderBottomColor: 'black',
		// 									    borderBottomWidth: 1,
		// 									    width: "100%",
		// 									    marginBottom: 20,
		// 									    marginTop: -20
		// 									  }}
		// 									/>
		// 					                <NativeText>
		// 					                  <NativeText style={{ color: "red" }}> Message: </NativeText> {item.message}
		// 					                </NativeText>

		// 					              </Body>
		// 					            </CardItem>
		// 					            <CardItem footer bordered>
		// 					              <NativeText>Date Sent: {item.timestamp}</NativeText>
							              
		// 					            </CardItem>
		// 					            {/*<ElementsButton onPress={()  => {
		// 									this.setState({
		// 										showReply: !this.state.showReply
		// 									})
											
		// 					              }} title="Reply..." style={styles.btn}> </ElementsButton>*/}
		// 					        </Card>
									
		// 						);
		// 					}
		// 				}
		// 			})
		// 		}
		// 	})
		// }
	}

	renderSubmit = () => {
		const date = new Date();
		let minute = date.getMinutes();
		let hour = date.getHours();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		
		let minutesCalc = (minute.length === 1) ? "0" + minute : minute ;

		let hours = date.getHours() % 12 || 12; 

		let ampm = (hours >= 12) ? "PM" : "AM";

		const finalTime = month + "/" + day + "/" + year + " " + hour + ":" + minutesCalc + " ";

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/post/messages/responses", {
			uuid: this.props.propsData.uuid
		}).then((res) => {
			this.setState({
				dataSetTwo: res.data,
				showReply: false
			})
		}).catch((err) => {
			console.log(err.response);
		});
		
		this.setState({
			showReply: false
		})
	}
	render() {
		if (this.props.passed) {
			return this.props.passed.map((i, idx) => {
				if (i.messages) {
					let reversed = i.messages.reverse();
					if (reversed) {
						return reversed.map((item, index) => {
							if (item.uuid === this.props.propsData.uuid) {
								if (item.initialMessage === false) {
									return (
										<Card key={index}>
								            <CardItem header bordered>
								              <NativeText>{`${item.firstName ? item.firstName : "No Name Provided."} ${item.lastName ? item.lastName : ""}`}</NativeText>
								            </CardItem>
								            <CardItem bordered>
								              <Body>
								              <View
												  style={{
												    borderBottomColor: 'black',
												    borderBottomWidth: 1,
												    width: "100%",
												    marginBottom: 20,
												    marginTop: -20
												  }}
												/>
								                <NativeText>
								                  <NativeText style={{ color: "red" }}> Message: </NativeText> {item.message}
								                </NativeText>

								              </Body>
								            </CardItem>
								            <CardItem footer bordered>
								              <NativeText>Date Sent: {item.timestamp}</NativeText>
								              
								            </CardItem>
								            {/*<ElementsButton onPress={()  => {
												this.setState({
													showReply: !this.state.showReply
												})
												
								              }} title="Reply..." style={styles.btn}> </ElementsButton>*/}
								        </Card>
										
									);
								}
							}
						})
					}
				}
			})
		}
		return (
			<View>
				{this.handleUpdate()}
					
		{/*		{this.renderContent()} 	*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btnContainer: {
		marginTop: 30
	},
	viewBottomBtn: {
		marginTop: 30
	},
	mapcontainer: {
		flex: 1,
		width: Dimensions.get('window').width,
    	height: 400,
	},
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
		email: state.userData.data.email,
		passed: state.savePropsData.data
	}
}
export default connect(mapStateToProps, { saveEmail })(GatherResponses);