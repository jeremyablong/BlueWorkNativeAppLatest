import React, { Component } from 'react';
import { Text as NativeText, View, StyleSheet, Button as NativeButton, ScrollView, Image, Dimensions, ImageBackground } from "react-native";
import { Header as Head, Button as ElementsButton, Card, Icon, Text } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import Geocode from "react-geocode";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Drawer from 'react-native-drawer';
import StartIndividualConvo from "../../messages/singleViewStart/startConvo.js";
import Modal from "react-native-modal";
import { Textarea } from "native-base";
import { saveEmail } from "../../../actions/index.js";
import uuid from "react-uuid";
import { store } from "../../../store/store.js"; 
import { 
	sbCreateOpenChannel, 
	sbCreateOpenChannelListQuery, 
	sbOpenChannelEnter, 
	sbGetOpenChannel,
	getOpenChannelList
} from "../../../actions/openChannel.js";
import { onSendButtonPress } from "../../../actions/chat.js";
// import SendBird from 'sendbird';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDSTHo-QfCcFzb1Tn-lA0uL3Q-rOGdhkcQ");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("us");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();

const { width, height } = Dimensions.get('window')
// stripe.setOptions({

class ViewIndividualJob extends Component {
constructor () {
	super();

    this.state = {
        params: {},
        data: [],
		email: "",
		firstName: "",
		lastName: "",
		addressCity: "",
		addressState: "",
		addressZipCode: "",
		gender: "",
		age: "",
		hobbies: "",
		occupation: "",
		latitude: 0,
		longitude: 0,
		showMap: false,
		isModalVisible: false,
		propsData: null,
		data: [],
		date: null,
		timestamp: null,
		nickname: "",
		userId: "",
		error: ""
    }
}
	componentDidMount () {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		const openChannelListQuery = sbCreateOpenChannelListQuery();
	      this.setState({ 
	      	openChannelListQuery,
	      }, () => {
	      	console.log("THIS.STATE.openChannelListQuery", this.state.openChannelListQuery);
			this.props.getOpenChannelList({
				openChannelListQuery: this.state.openChannelListQuery, 
				userId: store.getState().userData.data.userId
			});
	    });

		this.setState({
			params: propsData
		}, () =>  {
			console.log("This is the state params data :", this.state.params);
		})
		
		axios.get("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/getUserInfo").then((res) => {
			console.log("First GET request: ", res.data);
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err)
		});

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				messagesJobsHistory: res.data
			}, () => {
				console.log("messagesJobsHistory:", this.state.messagesJobsHistory);
			})
		}).catch((err) => {
			console.log(err.response);
		});
	}
	renderGeoLocation = () => {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		console.log("PROPS-DATA VIEW-INDIVIDUAL PAGE :", propsData)

		if (propsData.streetAddress) {
			Geocode.fromAddress(propsData.streetAddress).then(
			  response => {
			    const { lat, lng } = response.results[0].geometry.location;
			    this.setState({
			    	latitude: lat,
			    	longitude: lng
			    })
			    
		
			  }
			  // , (error) => {
			  //   console.error("This is the eroror for the geocode api :", error);
			  // }
			);
		}
	}
	nextPage = () => {
		return null;
	}
	apiCallback = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				messagesJobsHistory: res.data
			}, () => {
				console.log("messagesJobsHistory:", this.state.messagesJobsHistory);
			})
		}).catch((err) => {
			console.log(err.response);
		});
	}
	renderLeftContent = () => {
		return (
			<View>
				<Text 
				style={{ color: "white" }}
				title="Back"
				onPress={() => {
					this.props.navigation.navigate("jobs_list")
					console.log("login redirect clicked.")
				}}>
					BACK
				</Text>
			</View>
		);
	}
	handleSubmitTwo = () =>  {
		console.log("Take this job - call documented.")
	}

	toggleModal = () => {
    	this.setState({ 
    		isModalVisible: !this.state.isModalVisible 
    	});
    };
    renderSubmit = () => {


		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		console.log("propsDataaaaaaaaaaaaa:", propsData);

		this.props.sbCreateOpenChannel(store.getState().userData.data.firstName + " " + store.getState().userData.data.lastName, store.getState().userData.data.userId, propsData, this.state.message);

		/// insert data here to display passed down data - take resolved/created item and bring it to the client side + use it in onSendButtonPress ////////
		

		// this.props.onSendButtonPress({
  //       	channelUrl: propsData.url, 
  //       	isOpenChannel: propsData.channelType, 
  //       	textMessage: this.state.message,
  //       	userId: store.getState().userData.data.userId
  //       });

		//////////////////////////////////////////////////////////

		axios.post("http://172.31.99.114:5000/gather/channels", {
			email: this.props.email
		}).then((res) => {
			console.log("/gather/channels res.data", res.data);
		}).catch((err) => {
			console.log(err);
		});

		setTimeout(() => {
			this.props.onSendButtonPress({
	        	channelUrl: store.getState().relayChannel.channel.url, 
	        	isOpenChannel: store.getState().relayChannel.channel.channelType, 
	        	textMessage: this.state.message,
	        	userId: store.getState().userData.data.userId
	        });
		}, 4000);
		
		this.setState({
			isModalVisible: !this.state.isModalVisible
		})
	}
	handleSubmit = () => {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");
		this.props.navigation.navigate("message_start", { dataToMessage: propsData });
	}
	button = () => {
		return (
			<View>
				<ElementsButton title="Back" onPress={() => {
					this.setState({
						isModalVisible: false
					})
				}}></ElementsButton>
			</View>
		);	
	}
	renderMainContent = () => {
		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID");

		console.log("PROPS-DATA FINALE :", propsData);
		// this.props.saveEmail(propsData.email);
		if (this.state.isModalVisible) {
			return (
			 	<Modal isVisible={this.state.isModalVisible}>
			 	
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
				return (
				<View>
					<Card
					  title={`Business Name: ${propsData.businessName}`} 
					  subtitle="subtitle"
					  image={require('../../../images/builders.jpg')}>
					  <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Job Category: </Text> {propsData.category}
					  </Text>
					  <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Hourly Pay: </Text> {propsData.hourly}
					  </Text>

					  <Text style={{marginBottom: 10, fontSize: 20}}>
					    {`We Need ${propsData.workerCount} different workers for this job`}
					  </Text>

					  <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Job Description: </Text> {propsData.jobDescription}
					  </Text>

					  {propsData.phoneNumber ? <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Phone Number: </Text> {propsData.phoneNumber}
					  </Text> : null}
					   {propsData.streetAddress ? <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Street Address: </Text> {propsData.streetAddress}
					  </Text> : null}

					   {propsData.city ? <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> City: </Text> {propsData.city}
					  </Text> : null}

					   {propsData.zipCode ? <Text style={{marginBottom: 10, fontSize: 20}}>
					    <Text style={{ color: "red" }}> Zip Code: </Text> {propsData.zipCode}
					  </Text> : null}
					  <ElementsButton 
					  	onPress={() => {
					  		this.toggleModal()				  		
					  	}}
					    icon={<Icon name='message' color='#ffffff' />}
					    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
					    title='MESSAGE THIS COMPANY' />
					<View style={styles.viewBottomBtn}>
					    <ElementsButton 
					  	onPress={() => {
					  		this.renderGeoLocation()
					  		this.setState({
					  			showMap: !this.state.showMap
					  		})

					  	}} 

					    icon={<Icon name='map' color='#ffffff' />}
					    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
					    title='SHOW LOCATION ON A MAP ' />

					</View>

					</Card>
					{this.renderMap()}
				</View>
				);
	}
	// renderSecondaryContent = () => {
	// 	if (this.state.messagesJobsHistory.length > 0) {
	// 		return this.state.messagesJobsHistory.jobHistory.map((item, index) => {
	// 			console.log("this.state.messagesJobsHistory.jobHistory.map", item)
	// 		})
	// 	}	
	// }
	renderMap = () => {
		const LATITUD_DELTA = 0.0922
		
		const LONGITUDE_DELTA = LATITUD_DELTA + (width / height);

		

		if (this.state.showMap === true) {
			return (
				<MapView
		         style={styles.mapcontainer}
		         provider={PROVIDER_GOOGLE}
		         showsUserLocation
		         initialRegion={{
			         latitude: this.state.latitude,
			         longitude: this.state.longitude,
			         latitudeDelta: LATITUD_DELTA,
			         longitudeDelta: LONGITUDE_DELTA
			     }}><Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }} /> 
			    </MapView>
			);
		}
	}
	render() {

		const { navigation } = this.props;
		const propsData = navigation.getParam("data", "NO-ID")
		return (
			<ScrollView>
				<Head 
				  rightComponent={this.nextPage()}
				  leftComponent={this.renderLeftContent()}
				  centerComponent={{ text: 'View Our Jobs!', style: { color: '#fff' } }}
				/>
			
				<NativeText style={{ textAlign: "center", fontSize: 25 }}>Welcome to <Text style={{ color: "red", textAlign: "center", fontSize: 25 }}>{propsData.businessName}</Text>'s page!</NativeText>
				{this.renderMainContent()}
		
			<View style={styles.btnContainer}>
				
				<ElementsButton onPress={() => {
					navigation.navigate("jobs_list")
				}} style={styles.bottomBtn} title="Go Back To Previous Page"></ElementsButton>
			</View>
			
			</ScrollView>
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
		width: width,
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
		firstName: state.userData.data.firstName,
		lastName: state.userData.data.lastName,
		email: state.userData.data.email,
		otherUserEmail: state.jobHistory.data,
		channels: state.channels.list,
		relayUrl: state.relayChannel.channel.url,
		channelType: state.relayChannel.channel.channelType
	}
}
export default connect(mapStateToProps, { 
	saveEmail, 
	sbCreateOpenChannel, 
	onSendButtonPress, 
	sbCreateOpenChannel, 
	sbCreateOpenChannelListQuery, 
	sbOpenChannelEnter, 
	sbGetOpenChannel,
	getOpenChannelList
})(ViewIndividualJob);


		