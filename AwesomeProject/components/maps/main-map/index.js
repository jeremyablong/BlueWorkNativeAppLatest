import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Text as Texttt, Dimensions, StyleSheet, Button as Buttonnn, TouchableHighlight, ImageBackground,TouchableOpacity } from "react-native";
import { Container, Headerrr, Content, Footer, FooterTab, Button, Text,  Card, CardItem, Body, List, Textarea } from 'native-base';
import { SearchBar, ListItem, Header, Button as ElementsButton, Icon  } from "react-native-elements";
import axios from "axios";
import SearchZip from "../helpers/searchZip.js";
import Geocode from "react-geocode";
import Geocoder from 'react-native-geocoding';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { storeMarkerData } from "../../../actions/index.js";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { store } from "../../../store/store.js";
import uuid from "react-uuid";


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyDSTHo-QfCcFzb1Tn-lA0uL3Q-rOGdhkcQ");

Geocoder.init("AIzaSyA6OioFF7_luwmLZYzxxj5o-spBAyGJxHc");
 
// set response language. Defaults to english.
// Geocode.setLanguage("en");
 
// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("us");
 
// // Enable or disable logs. Its optional.
// Geocode.enableDebug();


const { width, height } = Dimensions.get('window')

class MainMap extends Component {
constructor ( ){
	super();

	this.state = {
		data: [],
		query: "",
		zipCodeShow: false,
		markers: [],
		showCallout: false,
		slideUpPanelvisible: false,
		showMarkerRender: false,
		showMarkerData: false,
		isModalVisible: false,
		streetAddress: "",
		self: null,
		email: "",
		message:"", 
		firstName: "",
		lastName: "",
		jobHistory: [],
		category: "",
		hourly: 0,
		workerCount: 0,
		phoneNumber: null,
		city: "",
		zipCode: null,
		businessName: "",
  		jobDescription: "",
  		startLng: 0,
  		startLat: 0,
  		uuid: uuid()
	}
}
	componentDidMount (value) {
		this.setState({
			query: value
		}, () => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobs/map", {
				streetAddress: this.state.query
			}).then((res) => {
				this.setState({
					data: res.data
				}, () => {
					console.log(this.state.data)
				})
			}).catch((err) => {
				this.setState({
					error: err
				})
			})	
		})	

		const LATITUD_DELTA = 0.0922
		
		const LONGITUDE_DELTA = LATITUD_DELTA + (width / height);

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/map/findAll", {
			search: this.state.query
		}).then((res) => {
			this.setState({
				data: res.data
			}, () => {
			return this.state.data.map((item) => {
				if (item.businessDetails) {
					return item.businessDetails.map((i, idx) => {
						console.log("the magic i :", i);
						if (i.streetAddress) {
							Geocoder.from(i.streetAddress).then(
							  response => {
							    const { lat, lng } = response.results[0].geometry.location;
							    console.log(lat, lng)
							    let newObj = {
									latitude: lat,
									longitude: lng,
									businessName: i.businessName,
									category: i.category,
									city: i.city,
									hourly: i.hourly,
									jobDescription: i.jobDescription,
									workerCount: i.workerCount,
									zipCode: i.zipCode,
									email: i.email
							    };
							    this.setState({
									markers: [
										...this.state.markers,
										newObj
									]
							    })
							  }
							).catch((err) => {
								console.log(err)
							});
						
						} else {
							console.log("Does not have an address.")
						}
					})
				}
			})
			
			});
		}).catch((err) => {
			this.setState({
				error: err
			})
		})
		// navigator.geolocation.getCurrentPosition((position) => {

  //       	const lat = position.coords.latitude;
  //       	const lng = position.coords.longitude;
  //       	this.setState({
  //       		startLng: lng,
  //       		startLat: lat
  //       	})
	 //    }, (error) => {
	 //    	console.log("navigator get current loc err :", error);
	 //    }, { timeout: 30000 });
		
	}
	renderLeftContent = () => {
		return (
			<View>
				<Text style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("home")
				}} 
			
				style={styles.btn}> HOME
				</Text>
			</View>
		);
	}
	renderRightContent = () => {
		return (
			<View>
				<Text style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("messages_home")
				}} 
		
				style={styles.btn}> MSG'S
				</Text>
			</View>
		);
	}
	updateSearch = (value) => {
		console.log(value)
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobs/map", {
			streetAddress: value
		}).then((res) => {
			this.setState({
				query: value
			})
		}).catch((err) => {
			this.setState({
				error: err
			})
		})
	}
	renderCallout = () => {
		this.setState({
			showCallout: !this.state.showCallout
		})
	}
	renderMarkerCallout = (data) => {
		this._panel.show()
	}	
	button = () => {
		return (
			<View>
				<Text style={styles.text} onPress={() => {
					this.setState({
						isModalVisible: false
					})
				}}>BACK</Text>
			</View>
		);
	}
	nextPage = () => {
		return null;
	}
	renderModal = () => {
		return (
		<View>
			<Modal isVisible={this.state.isModalVisible}>
		 	
					<View style={styles.container}>
					<Header
					  style={styles.nav}
					  leftComponent={this.button()}
					  centerComponent={{ text: 'Chat Message Homepage', style: { color: '#fff' } }}
					  rightComponent={this.nextPage()}
					/>
					<ImageBackground source={require("../../../images/matrix.jpg")} style={styles.background}>
				  	
					</ImageBackground>
				    <View style={styles.footer}>
				        {/*<Textarea onChangeText={(value) => {
				        	
				        }} rowSpan={5} bordered style={{ backgroundColor: "white" }} placeholder="Hi Tom, Are we still on for tomorrow at 8:00am? Send a message today!" />*/}
	        				<Textarea onChangeText={(value) => {
					        	this.setState({
					        		message: value,
					        		date: new Date()
					        	})
					        }} rowSpan={5} bordered style={{ backgroundColor: "white" }} placeholder="Hi Tom, Are we still on for tomorrow at 8:00am? Send a message today!" />
					        <ElementsButton 
					          title="Send Message...!" 
					          style={styles.submitBtn} 
					          onPress={() => {
					          	this.renderModalSubmission()
					          }}
					        >

				        	</ElementsButton>
				    </View>
				</View>
				
			</Modal>
		</View>
		);
	}
	renderModalSubmission = () => {

		const generateUUID = uuid();

		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobHistory/messages", {
			email: this.props.email
		}).then((res) => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/initial/message", {
				self: this.state.email,
				email: this.props.email,
				message: this.state.message,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				jobHistory: res.data,
				category: this.state.category,
				hourly: this.state.hourly,
				workerCount: this.state.workerCount,
				phoneNumber: this.state.phoneNumber,
				city: this.state.city,
				zipCode: this.state.zipCode,
				uuid: this.state.uuid
			}).then((res) => {
				this.setState({
					data: res.data,
					isModalVisible: false
				}, () => {
					console.log("SUCCESS ONE.")
				})
			}).catch((err) => {
				console.log(err);
			})
				
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/send/backlash/message", {
				self: this.props.email,
				email: this.state.email,
				message: this.state.message,
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				jobHistory: res.data,
				category: this.state.category,
				hourly: this.state.hourly,
				workerCount: this.state.workerCount,
				phoneNumber: this.state.phoneNumber,
				city: this.state.city,
				zipCode: this.state.zipCode,
				uuid: this.state.uuid
			}).then((res) => {
				this.setState({
					dataSetTwo: res.data
				}, () => {
					console.log(this.state.dataSetTwo);
					console.log("SUCCESS TWO.")
				})
			}).catch((err) => {
				console.log(err);
			})
		}).catch((err) => {
			console.log(err.response);
		});
	}
	// renderGEO = () => {
	// 	Geolocation.getCurrentPosition((info) => { 
	// 		console.log("LOCATION INFO :", info.coords.latitude)
	// 		if (info) {
				
	// 		}
	// 	});
	// }
	render() {
		console.log("this.state.CHECK_STATE :", this.state);
			return (
				<View style={{ flex: 1 }}>
				<Header
				  leftComponent={this.renderLeftContent()}
				  centerComponent={{ text: 'Welcome to the "Job Map View" page', style: { color: '#fff', textAlign: "center" } }}
				  rightComponent={this.renderRightContent()}
				/>
					{this.state.zipCodeShow === true ? <SearchZip navigation={this.props.navigation} /> : null}
					<MapView
				         style={styles.mapcontainer}
				         provider={PROVIDER_GOOGLE}
				         showsUserLocation
				         initialRegion={{
				         latitude: store.getState().location.data.latitude,
				         longitude: store.getState().location.data.longitude,
				         latitudeDelta: 0.0922,
				         longitudeDelta: 0.0421}}
				      > 
				      {this.state.markers ? this.state.markers.map((item, index) => {
				    	console.log("THIS IS THE MAPPPPPPPED ITEMS :", item);
				   		
				    	return (
				    	<View key={index}>
							<MapView.Marker
							   coordinate={item}
							   onPress={() => {
							   	console.log("Onpress callback");
							   }}
							   title={item.businessName} 
							   description={item.jobDescription}
							   onCalloutPress={()  => {
							   	console.log("Callout.");
							}}> 
								<MapView.Callout 
								 onPress={() =>  {
								  	this.setState({
								  		businessName: item.businessName,
								  		category: item.category,
								  		city: item.city,
								  		hourly: item.hourly,
								  		jobDescription: item.jobDescription,
								  		workerCount: item.workerCount,
								  		zipCode: item.zipCode,
								  		email: item.email
								  	}, () => {
								  		this.setState({
								  			isModalVisible: !this.state.isModalVisible
								  		})
								  	});

								  }}
						          tooltip={true}>
									  <Card 
									  	  style={{ padding: 14, maxWidth: 325 }}
										  image={require('../../../images/builders.jpg')}>
										 	  <Text><Text style={{ color: "red" }}>HOURLY PAY:</Text> {item.hourly} </Text>
									 		  <Text style={styles.name}><Text style={{ fontWeight: "bold" }}> Business Name:</Text> {item.businessName}</Text>
									          <Text> <Text style={{ fontWeight: "bold" }}>Description:</Text> {item.jobDescription} </Text>
									          <Text> <Text style={{ fontWeight: "bold" }}>Category:</Text> {item.category} </Text>
									          <Text> <Text style={{ fontWeight: "bold" }}>City:</Text> {item.city} </Text>
									          <Text> <Text style={{ fontWeight: "bold" }}>Zip-Code:</Text> {item.zipCode} </Text>
									          <Text> <Text style={{ fontWeight: "bold" }}>Workers Needed:</Text> {item.workerCount} </Text>
									          
										  <ElementsButton
										    icon={<Icon name='message' color='#ffffff' />}
										    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
										    title='MESSAGE NOW' />
									  </Card>
						        </MapView.Callout>
						    
							</MapView.Marker>
							
						</View>
				    	);
						
				    	{/*return <MapView.Marker key={index} coordinate={item}/>*/}
				    }) : console.log("THIS.STATE.MARKERS NOT RECOGNIZED.")}
						

				           
				      </MapView>
					
					{this.renderModal()}
					
							
				      <Footer>
			          <FooterTab>
			           {/* <Button onPress={() => {
			            	this.setState({
			            		zipCodeShow: true
			            	})
			            }}>
			              <Text>Zip Code</Text>
			            </Button>*/}
			            <Button>
			              <Text>City</Text>
			            </Button>
			            <Button active>
			              <Text>State</Text>
			            </Button>
			            <Button>
			              <Text>Street</Text>
			            </Button>
			          </FooterTab>
			        </Footer>
				</View>
			);
	}
}
const styles = StyleSheet.create({
	mapcontainer: {
		flex: 1,
		width: width,
    	height: height,
	},
	customView: {
		width: 200,
		minWidth: 200,
		height: 100,
		minHeight: 100
	},
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
    },
    nav: {

    },
    text: {
    	color: "white"
    }
});

const mapStateToProps = (state) => {
	return {
		firstName: state.userData.data.firstName,
		lastName: state.userData.data.lastName,
		email: state.userData.data.email,
		otherUserEmail: state.jobHistory.data
	}
}
export default connect(mapStateToProps, { storeMarkerData })(MainMap);