import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Header, Button as NativeButton, Input } from "react-native-elements";
import { StripeProvider } from 'react-stripe-elements';
// import stripe from 'tipsi-stripe';
import axios from 'axios';
import { doPayment } from "../stripeHelper.js";
import RNPickerSelect from 'react-native-picker-select';
import { connect } from "react-redux";
import { geolocated } from "react-geolocated";
import MakePaypalPayment from "../../../paypal/makePayment.js";
// import Geocode from "react-geocode";
 
// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyDSTHo-QfCcFzb1Tn-lA0uL3Q-rOGdhkcQ");
 
// // set response language. Defaults to english.
// Geocode.setLanguage("en");
 
// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("us");
 
// // Enable or disable logs. Its optional.
// Geocode.enableDebug();
// // stripe.setOptions({
//   publishableKey: 'pk_test_KceCoYqjfGRmObQ9oE81GH0T00KhClH2TA',
// });

class SignupBusinessAccount extends Component {
constructor () {
	super();

	this.state = {
		isPaymentPending: false,
		businessName: "",
		category: "",
		hourly: "",
		workerCount: "",
		jobDescription: "",
		email: "",
		phoneNumber: "",
		streetAddress: "",
		zipCode: 0,
		city: ""
	}
}	
	handleInitialSubmit = () => {
		
		// this.requestPayment()
	}
	// renderGeoLocation = () => {
	// 	Geocode.fromAddress("Eiffel Tower").then(
	// 	  response => {
	// 	    const { lat, lng } = response.results[0].geometry.location;
	// 	    console.log(lat, lng);
	// 	  },
	// 	  error => {
	// 	    console.error(error);
	// 	  }
	// 	);
	// }
	requestPayment = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/stripe/signup/business", { 
			email: this.props.email,
			businessName: this.state.businessName,
			category: this.state.category,
			hourly: this.state.hourly,
			workerCount: this.state.workerCount,
			jobDescription: this.state.jobDescription.toLowerCase(),
			email: this.props.email,
			phoneNumber: this.state.phoneNumber,
			streetAddress: this.state.streetAddress.toLowerCase(),
			zipCode: this.state.zipCode,
			city: this.state.city.toLowerCase()
		  }).then((res) => {
			console.log(res.data);
			this.setState({
				businessName: "",
				category: "",
				hourly: "",
				workerCount: "",
				jobDescription: "",
				email: "",
				phoneNumber: "",
				streetAddress: "",
				zipCode: "",
				city: ""
			}, () => {
				alert("You've successfully posted this job!")
			})
		  }).catch((err) => {
		  	console.log(err);
		  })
	  // this.setState({ 
	  // 	isPaymentPending: true 
	  // });
	  // return stripe
	  //   .paymentRequestWithCardForm()
	  //   .then(stripeTokenInfo => {
	  //     return doPayment(299, stripeTokenInfo.tokenId);
	  //   })
	  //   .then(() => {
	  //     console.warn('Payment succeeded!');
		  
		 //  axios.post("http://10.0.2.2:5000/stripe/signup/business", { 
			// email: this.props.email,
			// businessName: this.state.businessName,
			// category: this.state.category,
			// hourly: this.state.hourly,
			// workerCount: this.state.workerCount,
			// jobDescription: this.state.jobDescription,
			// email: this.props.email,
			// phoneNumber: this.state.phoneNumber
		 //  }).then((res) => {
			// console.log(res.data);
			// this.setState({
			// 	businessName: "",
			// 	category: "",
			// 	hourly: "",
			// 	workerCount: "",
			// 	jobDescription: "",
			// 	email: "",
			// 	phoneNumber: ""
			// })
		 //  }).catch((err) => {
		 //  	console.log(err);
		 //  })
		  	
	  //     alert("Payment Succeeded, Thank you for your payment!")
	  //   })
	  //   .catch(error => {
	  //     console.warn('Payment failed', { error });
	  //   })
	  //   .finally(() => {
	  //     this.setState({ 
	  //     	isPaymentPending: false 
	  //     });
	  //   });
	};
	renderLeftContent = () => {
		return (
			<View>
				<NativeButton title="HOME" onPress={() => {
					this.props.navigation.navigate("home");
				}}></NativeButton>
			</View>
		);	
	}
	renderRight = () => {
		return (
			<View>
				<NativeButton title="BACK" onPress={() => {
					this.props.navigation.navigate("profile");
				}}></NativeButton>
			</View>
		);	
	}
	render() {
		return (
			<ScrollView>
			<Header
			  leftComponent={this.renderLeftContent()}
			  centerComponent={{ text: 'SIGN-UP FOR A BUSINESS ACCOUNT', style: { color: '#fff' } }}
			  rightComponent={this.renderRight()}
			/>
				
				{/*<Text style={styles.mainText}>LIMITED TIME OFFER - Post Jobs For Free!</Text>*/}
				{this.state.businessName && this.state.category && this.state.hourly && this.state.workerCount && this.state.jobDescription && this.state.zipCode && this.state.city && this.state.streetAddress ? <NativeButton onPress={() => {
					this.requestPayment()
				}} style={{ marginTop: 20, marginBottom: 20 }} title="Create a job posting for FREE for a limited time!"></NativeButton> : null}
				<Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		businessName: value
		          	})
		          }}
		          label="Business Name"
		          value={this.state.businessName}
		          placeholder='We Code With Clarity'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		phoneNumber: value
		          	})
		          }}
		          label="Phone Number"
		          value={this.state.phoneNumber}
		          placeholder="Please do not put any dashes or ( ) "
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />
		         <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		streetAddress: value
		          	})
		          }}
		          label="Street Address"
		          value={this.state.streetAddress}
		          placeholder="2382 Walnut Lane"
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />
		         <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		zipCode: value
		          	})
		          }}
		          label="Numerical Zip Code - ex. 90012"
		          value={this.state.zipCode}
		          placeholder="Please enter the numerical zip code number"
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />
		         <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		city: value
		          	})
		          }}
		          label="Address City"
		          value={this.state.city}
		          placeholder="Please enter your city name"
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />
			<View style={{ paddingLeft: 13, paddingRight: 13 }}>
		        <Text style={{ fontSize: 20, paddingTop: 20 }}> Choose your business category </Text>
		         <RNPickerSelect 
					style={styles.select} 
		            onValueChange={(value) => {
		            	this.setState({
		            		category: value
		            	})
		            }}
		            value={this.state.category}
		            items={[
		            	{ label: "Manufacturing", value: "Manufacturing" },
		                { label: 'Automotive', value: 'Automotive' },
		                { label: 'Boilermaker', value: 'Boilermaker' },
		                { label: "Brick Mason", value: "Brick Mason" },
		                { label: 'Carpenter', value: 'Carpenter' },
		                { label: 'Construction', value: 'Construction' },
		                { label: "Custodian", value: "Custodian" },
		                { label: 'Electrician', value: 'Electrician' },
		                { label: 'EMT/Firefighter', value: 'EMT/Firefighter' },
		                { label: "Home Health Aide", value: "Home Health Aide" },
		                { label: 'Gardening/landscaping', value: 'Gardening/landscaping' },
		                { label: 'Law Enforcement', value: 'Law Enforcement' },
		                { label: "Machinist", value: "Machinist" },
		                { label: 'Jantorial', value: 'Jantorial' },
		                { label: 'Painter', value: 'Painter' },
		                { label: "Truck Driving", value: "Truck Driving" },
		                { label: 'Welder', value: 'Welder' },
		                { label: 'Food Service', value: 'Food Service' },
		                { label: "Materials Handler", value: "Materials Handler" },
		                { label: 'Cooking', value: 'Cooking' },
		                { label: 'Heavy Equiptment Op', value: 'Heavy Equiptment Op' },
		                { label: "NOT LISTED - OTHER", value: "NOT LISTED - OTHER" }
		            ]}
		        />
		</View>
		<View style={{ paddingLeft: 13, paddingRight: 13 }}>
		        <Text style={{ fontSize: 20, paddingTop: 20 }}> Choose what you are willing to pay - hourly </Text>
		         <RNPickerSelect 
					style={styles.select} 
		            onValueChange={(value) => {
		            	this.setState({
		            		hourly: value
		            	})
		            }}
		            value={this.state.hourly}
		            items={[
		            	{ label: "7.00", value: "7.00" },
		                { label: '8.00', value: '8.00' },
		                { label: '9.00', value: '9.00' },
		                { label: "10.00", value: "10.00" },
		                { label: '11.00', value: '11.00' },
		                { label: '12.00', value: '12.00' },
		                { label: "13.00", value: "13.00" },
		                { label: '14.00', value: '14.00' },
		                { label: '15.00', value: '15.00' },
		                { label: "16.00", value: "16.00" },
		                { label: '17.00', value: '17.00' },
		                { label: '18.00', value: '18.00' },
		                { label: "19.00", value: "19.00" },
		                { label: '20.00', value: '20.00' },
		                { label: '21.00', value: '21.00' },
		                { label: "22.00", value: "22.00" },
		                { label: '23.00', value: '23.00' },
		                { label: '24.00', value: '24.00' },
		                { label: "25.00", value: '25.00' },
		                { label: '26.00', value: '26.00' },
		                { label: '27.00', value: '27.00' }
		            ]}
		        />
		</View>
		<View style={{ paddingLeft: 13, paddingRight: 13, marginBottom: 13, height: 100, minHeight: 100 }}>
		        <Text style={{ fontSize: 20, paddingTop: 20 }}> How many workers do you need? </Text>
		         <RNPickerSelect 
					style={styles.select} 
		            onValueChange={(value) => {
		            	this.setState({
		            		workerCount: value
		            	})
		            }}
		            value={this.state.workerCount}
		            items={[
		            	{ label: "1", value: "1" },
		                { label: '2', value: '2' },
		                { label: '3', value: '3' },
		                { label: "4", value: "4" },
		                { label: '5', value: '5' },
		                { label: "6", value: "6" },
		                { label: '7', value: '7' },
		                { label: '8', value: '8' },
		                { label: "9", value: "9" },
		                { label: '10', value: '10' },
		                { label: "11-15", value: "11-15" },
		                { label: '16-20', value: '16-20' },
		                { label: '21-30', value: '21-30' }
		            ]}
		        />
		</View>
		        <View style={styles.inputMultiLine}>
					<Input 
					  
			          onChangeText={(value) => {
			          	this.setState({
			          		jobDescription: value
			          	})
			          }}
			          multiline={true}
			          label="Description/details of job"
			          value={this.state.jobDescription}
			          placeholder='We Code With Clarity'
			          leftIcon={
			           {/* <Icon
			              name='user'
			              size={24}
			              color='black'
			            />*/}
			          }
			        />
		        </View>

			<View style={styles.bottomBtnView}>
				{this.state.businessName && this.state.category && this.state.hourly && this.state.workerCount && this.state.jobDescription && this.state.zipCode && this.state.city && this.state.streetAddress ? <NativeButton onPress={() => {
					this.requestPayment()
				}} style={{ marginTop: 20, marginBottom: 20 }} title="Create a job posting for FREE for a limited time!"></NativeButton> : null}
		    </View>
		   
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	mainText: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 30
	},
	bottomBtnView: {
		marginTop: 30
	},
	textBox: {
		minHeight: 200
	}, 
	inputMultiLine: {
		
	},
	select: {
		minHeight: 100,
		paddingTop: 20,
		paddingBottom: 20
	}
})

const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}
export default connect(mapStateToProps, {  })(SignupBusinessAccount);