import React, { Component } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView, 
  ImageBackground, 
  Dimensions, 
  NestedScrollView, 
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView  } from "react-native";
import axios from "axios";
import { Button as ElementsButton, Header } from "react-native-elements";
import { Container, Header as Headerrr, Content, Card, CardItem, Text as NativeText, Body, Textarea } from "native-base";
import GatherResponses from "./gatherResponses.js";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { saveEmail, saveUUID, savePropsData } from "../../../actions/index.js";
import { onSendButtonPress, getPrevMessageList, sbCreatePreviousMessageListQuery } from "../../../actions/chat.js";
import { store } from "../../../store/store.js";


const {width, height} = Dimensions.get('window');


class Individual extends Component {
constructor () {
	super();

	this.state = {
		data: [],
		showReply: false,
		dataSetTwo: [],
		message: null,
		timestamp: null,
		dataSetThree: [],
		gather: [],
		postInfo: [],
		responseData: [],
		passDownData: [],
		scrollViewHeight: null,
		showReMap: true,
		showData: false,
		makeApiCall: true,
		messagesJobsHistory: [],
		jobHistoryJobHistory: [],
		previousMessageListQuery: null
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
				<Text style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("messages_home")
				}}>BACK</Text>
			</View>
		);
	}
	componentDidMount () {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		console.log("MY PROPSDATA :", propsData);

		sbCreatePreviousMessageListQuery({ 
			channelUrl: propsData.url, 
			isOpenChannel: propsData.channelType, 
			userId: store.getState().userData.data.userId 
		})
		.then(previousMessageListQuery => {
          	console.log("previousMessageListQuery", previousMessageListQuery);
            this.setState({ previousMessageListQuery }, () => {
              this.props.getPrevMessageList(this.state.previousMessageListQuery);
            });
          })
          .catch((error) => { 
          	console.log("sbCreatePreviousMessageListQuery error :", error);
          	this.props.navigation.goBack()
          });
		
		this.setState({
			params: propsData
		}, () =>  {
			console.log("This is the state params data in the individual index.js file :", this.state.params);
			console.log("this.state.params.email", this.state.params.email);

		})

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/convo/false", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				passDownData: res.data
			}, () => {
				this.props.savePropsData(this.state.passDownData);
			})
		}).catch((err) => {
			console.log(err.response);
		})

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				messagesJobsHistory: res.data
			})
		}).catch((err) => {
			console.log(err.response);
		});


		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/jobHistory", {
			uuid: propsData.uuid
		}).then((res) => {
			this.setState({
				jobHistoryJobHistory: res.data
			});
		}).catch((err) => {
			console.log(err.response);
		});
		// axios.post("http://10.0.2.2:5000/gather/convo/false", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/individual/message", {
			uuid: propsData.uuid
		}).then((res) => {
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err.response);
		})

		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	});
		// }).catch((err) => {
		// 	console.log(err.response);
		// });

		
		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	uuid: propsData.uuid
		// }).then((res) => {
		// 	this.setState({
		// 		postInfo: res.data
		// 	}, () => {
		// 		console.log("this.state.POSTINFO :", this.state.postInfo)
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })
		// console.log("BOOYAH")
	}

	componentDidUpdate() {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");
		this.props.saveUUID(propsData.uuid);


		if (this.state.makeApiCall) {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/convo/false", {
				email: this.props.email
			}).then((res) => {
					this.setState({
						passDownData: res.data,
						makeApiCall: false
					}, () => {
						this.props.savePropsData(this.state.passDownData)
					})
				}).catch((err) => {
					console.log(err.response);
			});
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
				email: this.props.email
			}).then((res) => {
				this.setState({
					messagesJobsHistory: res.data
				})
			}).catch((err) => {
				console.log(err.response);
			});
			// axios.post("http://10.0.2.2:5000/gather/jobHistory/jobHistory", {
			// 	uuid: propsData.uuid
			// }).then((res) => {
			// 	this.setState({
			// 		jobHistoryJobHistory: res.data
			// 	});
			// }).catch((err) => {
			// 	console.log(err.response);
			// });
		}
	}
	handleSubmit () {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		this.setState({
			showReMap: !this.state.showReMap
		});

		// axios.post("http://10.0.2.2:5000/gather/message/thread", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	}, () => {
		// 		// this.props.savePropsData(this.state.passDownData)
		// 	});
		// }).catch((err) => {
		// 	console.log(err.response);
		// })
		
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/individual/message", {
			uuid: propsData.uuid
		}).then((res) => {
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err.response);
		});
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/convo/false", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				showData: !this.state.showData,
				passDownData: res.data
			}, () => {
				this.props.savePropsData(this.state.passDownData)
			})
		}).catch((err) => {
			console.log(err.response);
		});

		// axios.post("http://10.0.2.2:5000/gather/convo/false", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		passDownData: res.data
		// 	}, () => {
		// 		this.props.savePropsData(this.state.passDownData)
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })

		// axios.post("http://10.0.2.2:5000/get/all/messages", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		responseData: res.data
		// 	}, () => {
		// 		console.log("This is the this.state.responseData code", this.state.responseData)
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// })

		// axios.post("http://10.0.2.2:5000/get/all/messages", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	console.log("THEN")
		// 	// this.setState({
		// 	// 	data: res.data
		// 	// }, () => {
		// 	// 	console.log("This is the homepage for this.state.data", this.state.data)
		// 	// })
		// 	console.log(res.data);
		// }).catch((err) => {
		// 	console.log(err.response);
		// });

		
	}
	renderSubmit = () => {
		console.log("Render Submit Clicked .", propsData);
		

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

		// axios.post("http://10.0.2.2:5000/gather/jobHistory/messages", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	this.setState({
		// 		messagesJobsHistory: res.data
		// 	}, () => {
		// 		console.log("messagesJobsHistory:", this.state.messagesJobsHistory)
		// 	})
		// }).catch((err) => {
		// 	console.log(err.response);
		// });

		console.log("Submit ClickedDDDDDDDDDDDD.");
		this.setState({
			timestamp: finalTime
		}, () => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/individual/message/reply", {
				uuid: this.props.uuid,
				message: this.state.message,
				timestamp: this.state.timestamp,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				self: this.props.email,
				email: propsData.email
			}).then((res) => {
				this.setState({
					dataSetTwo: res.data,
					showReply: false
				}, () => {
					console.log("DATASETTWO:", this.state.dataSetTwo)
				})
			}).catch((err) => {
				console.log("ERROR NUMBER THREE.")
				console.log(err.response);
			});
			console.log("uuid :", propsData.uuid)
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/uuid/receiving", {
				uuid: this.props.uuid,
				message: this.state.message,
				timestamp: this.state.timestamp,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				email: propsData.email,
				self: this.props.email
			}).then((res) => {
				this.setState({
					dataSetThree: res.data,
					showReply: false
				}, () => {
					console.log("DATASETTWO:", this.state.dataSetTwo)
				})
			}).catch((err) => {
				console.log("ERROR NUMBER THREE.")
				console.log(err.response);
			});

			// axios.post("http://10.0.2.2:5000/gather/jobHistory/messages", {
			// 	email: this.props.email
			// }).then((res) => {
			// 	this.setState({
			// 		messagesJobsHistory: res.data
			// 	}, () => {
			// 		console.log("messagesJobsHistory:", this.state.messagesJobsHistory)
			// 	})
			// }).catch((err) => {
			// 	console.log(err.response);
			// });

			// axios.post("http://10.0.2.2:5000/gather/uuid/receiving", {
			// 	uuid: propsData.uuid,
			// 	message: this.state.message,
			// 	timestamp: this.state.timestamp,
			// 	firstName: this.props.firstName,
			// 	lastName: this.props.lastName,
			// 	email: propsData.email
			// }).then((res) => {
			// 	this.setState({
			// 		dataSetTwo: res.data
			// 	}, () => {
			// 		console.log("DATASETTWO:", this.state.dataSetTwo)
			// 	})
			// }).catch((err) => {
			// 	console.log(err.response);
			// });
			// alert("You've successfully responded!");
			this.props.navigation.navigate("messages_home");
		})
	}
	renderComments = () => {
		// if (this.state.responseData) {
		// 	return this.state.responseData.map((item, index) => {
		// 		console.log("this.state.responseData.map", item)
		// 	})
		// }
	}
	buttonTwo = () => {
		return (
			<Text style={{ color: "white" }} onPress={() => {
				this.setState({
					showReply: false
				})
			}}>BACK</Text>
		);
	}
	modalSubmit =  () => {
		console.log("Modal Submit!");
	}
	renderSendBirdCall = () => {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		if (this.state.message) {
	        this.props.onSendButtonPress({
	        	channelUrl: propsData.url, 
	        	isOpenChannel: propsData.channelType, 
	        	textMessage: this.state.message,
	        	userId: store.getState().userData.data.userId
	        });
	        this.setState({
	        	showReply: !this.state.showReply
	        })
	    } else {
	    	alert("Please enter a message...")
	    }

	}
	respond = () => {
		return (
		 	<Modal isVisible={this.state.showReply}>
		 	
					<View style={styles.container}>
					<Header
					  style={styles.nav}
					  leftComponent={this.buttonTwo()}
					  centerComponent={{ text: 'Chat Message Homepage', style: { color: '#fff' } }}
					  rightComponent={null}
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
					            this.renderSendBirdCall()
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
 	renderInitialCall = () => {

		// if (this.state.messagesJobsHistory) {
			// return this.state.messagesJobsHistory.jobHistory.map((item, index) => {
			// 	console.log
			// })
		// }

 	// 	const propsData = this.props.navigation.getParam("data", "NO-ID");
		// if (this.state.data) {
		// 	return this.state.data.map((item, index) => {
		// 		if (item.messages && this.state.showData === false) {
		// 			return item.messages.map((i, idx) => {
		// 			// this.props.addMessagesToStore(i);
					
		// 			if (i.uuid === propsData.uuid && i.initialMessage === true && i.self === this.props.email) {
					
							
		// 						return (
		//         					<Card key={idx}>
		// 					            <CardItem header bordered>
		// 					              <NativeText>{`${i.firstName ? i.firstName : "No Name Provided."} ${i.lastName ? i.lastName : ""}`}</NativeText>
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
		// 					                  <NativeText style={{ color: "red" }}> Message: </NativeText> {i.message}
		// 					                </NativeText>
		// 					                <View
		// 									  style={{
		// 									    borderBottomColor: 'black',
		// 									    borderBottomWidth: 1,
		// 									    width: "100%",
		// 									    marginTop: 15,
		// 									    marginBottom: 15
		// 									  }}
		// 									/>
		// 									<Text style={{ textAlign: "center", color: "darkblue", fontSize: 20 }}> Application Business Details. </Text> 
		// 						            <NativeText>Category: {i.category}</NativeText>
		// 						            {/*<NativeText>Phone Number Of Business: {i.phoneNumber}</NativeText>*/}
		// 						            <NativeText>City: {i.city}</NativeText>
		// 						            <NativeText>Zip-Code: {i.zipCode}</NativeText>
		// 						            <NativeText>Hourly Pay: {i.hourly}</NativeText>
		// 						            <NativeText>Workers Required: {i.workerCount}</NativeText>
								           
		// 					              </Body>
		// 					            </CardItem>
		// 					            <CardItem footer bordered>
		// 					            <NativeText>Date Sent: {i.timestamp}</NativeText>
							              
		// 					            </CardItem>
		// 					           {/* <ElementsButton onPress={()  => {
		// 									this.setState({
		// 										showReply: !this.state.showReply
		// 									})
											
		// 					              }} title="Reply..." style={styles.btn}> </ElementsButton>*/}
		// 					        </Card>
		// 						);
								
							
					
		// 				// // console.log("This is the individual/index.js item :", i)
		// 				// if (this.state.messagesJobsHistory.length > 0) {
		// 				// 	return this.state.messagesJobsHistory.map((item, index) => {
		// 				// 		console.log("this.state.messagesJobsHistory.jobHistory.map", item);
		// 				// 	})
		// 				// }
							
		// 			}
		// 		})
		// 		}

		// 	})
		// }
	}
	// _renderItem = ({item}) => {
	// 	const { navigation } = this.props;
	// 	const propsData = navigation.getParam("data", "NO-ID");

	// 	console.log("PROPSDATAAAAAAAAAAAAA :::::", propsData);

	// 	console.log("{ITEM} :", item);
	// 	if (propsData.url === item.channelUrl) {
	// 		if (item._sender.userId === this.props.userId) {
	// 	      return (
	// 	        <View style={styles.eachMsg}>
	// 	          <Image source={{ uri: item._sender.profileUrl}} style={styles.userPic} />
	// 	          <View style={styles.msgBlock}>
	// 	            <Text style={styles.msgTxt}>{item.message}</Text>
	// 	          </View>
	// 	        </View>
	// 	      );
	// 	    } else{
	// 	      return (
	// 	        <View style={styles.rightMsg} >
	// 	          <View style={styles.rightBlock} >
	// 	            <Text style={styles.rightTxt}>{item.message}</Text>
	// 	          </View>
	// 	          <Image source={{uri: item.image}} style={styles.userPic} />
	// 	        </View>
	// 	      );
	// 	    }
	// 	}
	// };
	render() {
		// console.log("This is the golden ticket that im looking for :", this.state.jobHistoryJobHistory);
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");
		console.log("$$$$$$$$$$$$ :", propsData)
		return (
		<>
			<View>
			<Header
			  style={styles.nav}
			  leftComponent={this.button()}
			  centerComponent={{ text: 'Chat Homepage', style: { color: '#fff' } }}
			  rightComponent={this.nextPage()}
			/>
	
		

				{/*<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Chat Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>*/}
		
				{/*{this.state.loaded ? null : <View style={{ top: 0, position: "absolute" }}><ElementsButton onPress={() => {
					this.handleSubmit()
				}} title="Load Page"></ElementsButton></View>}*/}
			<ScrollView onContentSizeChange={(width, height) => {
			    this.setState({
			    	scrollViewHeight: height
			    }, () =>  {
			    	console.log("scrollViewHeight", this.state.scrollViewHeight)
			    })
			  }}>
			{/*	{this.state.loaded ? null : <View><ElementsButton onPress={() => {
					this.handleSubmit()
				}} title="Gather Latest & Refresh Messages"></ElementsButton></View>}*/}
				{/*{this.renderInitialCall()}*/}
			
				<View style={{ flex: 1, height: "100%", marginBottom: 200 }}>
					<GatherResponses showReMap={this.state.showReMap} propsData={propsData} navigation={this.props.navigation} passDown={this.state.passDownData} hidden={this.state.showData}/>
					{this.respond()}
					{this.renderInitialCall()}
					{this.props.messages.map((item, index) => {
						console.log("TEST :", item._sender.nickname);
						if (propsData.url === item.channelUrl) {
							if (item._sender.userId === this.props.userId) {
						      return (
						        <View style={styles.eachMsg}>
						          <Image source={{ uri: item._sender.profileUrl}} style={styles.userPic} />
						          <View style={styles.msgBlock}>
						            <Text style={styles.msgTxt}>{item.message}</Text>
						          </View>
						        </View>
						      );
						    } else{
						      return (
						        <View style={styles.rightMsg} >
						          <View style={styles.rightBlock} >
						            <Text style={styles.rightTxt}>{item.message}</Text>
						          </View>
						          <Image source={{uri: item._sender.profileUrl}} style={styles.userPic} />
						        </View>
						      );
						    }
						}
						console.log("this.props.messages item :", item);
					})}
				</View>
			
			
				
			
			</ScrollView>

			</View>
			<View style={{ bottom: 0, position: "absolute", width: "100%" }}>
 				<ElementsButton onPress={()  => {
					this.setState({
						showReply: !this.state.showReply
					})
					
	              }} title="Reply..." style={styles.btn}> </ElementsButton>
			</View>
			</>
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
    keyboard: {
    	 flex: 1,
    	justifyContent: 'center',
    },
    image: {
  	  	width,
   		height,
  	},
    header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
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
		firstName: state.userData.data.firstName,
		lastName: state.userData.data.lastName,
		otherUserEmail: state.jobHistory.data,
		messages: state.userData.data.messages,
		uuid: state.uuid.data,
		messages: state.chatReducer.list,
		userId: state.SBlogin.user.userId
	}
}

export default connect(mapStateToProps, { 
	saveEmail, 
	getPrevMessageList, 
	saveUUID, 
	savePropsData, 
	onSendButtonPress, 
	sbCreatePreviousMessageListQuery 
})(Individual);