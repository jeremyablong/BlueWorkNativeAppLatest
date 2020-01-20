import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { Header, Button as NativeButton } from "react-native-elements";
import Navbar from "../universal/slide-out-menu.js";
import { store } from "../../store/store.js";
import { connect } from "react-redux";
import publicIP from 'react-native-public-ip';
import Geolocation from 'react-native-geolocation-service';
import { saveLocation } from "../../actions/index.js";
import SendBird from 'sendbird';

class Home extends Component {
constructor (props) {
	super(props);

	this.state = {
		ipv4Address: null,
		nickname: "",
		userId: "",
		error: ""
	}
}

	componentDidMount() {


		publicIP().then((ip) => {    
		  console.log("ip address :", ip);
		  this.setState({
		  	ipv4Address: ip
		  })
		  // '47.122.71.234'
		}).catch(error => {
		  console.log(error);
		  // 'Unable to get IP address.'
		});

		Geolocation.getCurrentPosition((position) => {
                console.log("POSTIONNNNNNN :", position);
                this.props.saveLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            }, (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 
        });
	}
	button = () => {
		console.log(store.getState())
		return (
			<Navbar navigation={this.props.navigation} />	
		);
	}
	nextPage = () => {
		return (
			<View>
				{/*<Text onPress={() => {
					this.props.navigation.navigate("contact")
				}}
					style={styles.navText}
				>Connect With Us</Text>*/}
			</View>
		);
	}
	renderApiCall = () => {
		console.log("renderApiCall clicked.");
		this.props.navigation.navigate("register");
	}
	render() {
		console.log("store = ", this.props.messages)
		const { firstName, lastName, email, password } = this.props;
		return (
		<ImageBackground source={require('../../images/building.jpg')} style={styles.backgroundImage}>
			<View style={styles.container}>

				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Sign-Up Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}/>
				<View style={{ marginTop: 0 }}>
				  {firstName && lastName && email && password ? <NativeButton 
					onPress={() => {
						this.props.navigation.navigate("signup_business_account");
						console.log("clicked");
					}} 
					type="solid" 
					title="CLICK TO POST A JOB TODAY!"
					style={styles.buttonMiddle}>
					</NativeButton> : <NativeButton 
					onPress={() => {
						this.props.navigation.navigate("register");
						console.log("clicked");
					}} 
					type="solid" 
					title="REGISTER TODAY TO CREATE A JOB POSTING"
					style={styles.buttonMiddle}>
					</NativeButton>}
				</View>
	
				
				<View style={styles.textView}>
					<Text style={styles.signupText}> {this.props.firstName ? `Hello, ${store.getState().userData.data.firstName}!`: "Please Sign-In."} </Text>
				</View>
				<View style={styles.contentContainer}>
			
					{firstName && lastName && email && password ? <NativeButton 
					  title="CLICK TO VIEW OUR POSTED JOBS TODAY!"
					  onPress={() => {
					  	this.props.navigation.navigate("jobs_list");
						console.log("Login");
					  }} 
					  style={styles.signin} 
					></NativeButton> : <NativeButton 
					  title="Login To Your Account"
					  onPress={() => {
					  	this.props.navigation.navigate("login");
						console.log("Login");

					  }} 
					  style={styles.signin} 
					></NativeButton>}

					{/*<NativeButton 
					  title="Login To Your Account"
					  onPress={() => {
					  	this.props.navigation.navigate("login");
						console.log("Login");
					  }} 
					  style={styles.signin} 
					></NativeButton>*/}
				</View>
				
				{/*<Header
				  leftComponent={{ icon: 'menu', color: '#fff' }}
				  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
				  rightComponent={{ icon: 'home', color: '#fff' }}/>*/}
				<View style={styles.btnContainer}>
					{firstName && lastName && email && password ? <NativeButton 
						onPress={() => {
							this.props.navigation.navigate("profile");
							console.log("clicked")
						}} 
						title="VISIT YOUR PROFILE"
						style={styles.bottomBtn}>
		
					</NativeButton> : <NativeButton 
						onPress={() => {
							console.log("clicked")
							this.renderApiCall()
						}} 
						title="SIGN UP TODAY!"
						style={styles.bottomBtn}>
		
					</NativeButton>}
					{/*<NativeButton 
						onPress={() => {
							this.props.navigation.navigate("register");
							console.log("clicked")
						}} 
						title="SIGN UP TODAY!"
						style={styles.bottomBtn}>
		
					</NativeButton>*/}
				</View>
			</View>
		</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    minHeight: "100%",
    height: "100%" 
  },
  container: {
	height: "100%",
	position: "relative"
  },
  bottomBtn: {
    bottom: 0,
    justifyContent: 'center', 
	alignItems: 'center'
  },
  btnContainer: {
  	  width: '100%',
	  height: 50,
	  justifyContent: 'center',
	  alignItems: 'center',
	  position: 'absolute', //Here is the trick
	  bottom: 20, //Here is the trick
  },
  signupText: {
  	color: "white",
  	fontSize: 40,
  	marginBottom: 20,
  	paddingTop: 10,
  	paddingBottom: 10,
  	fontWeight: 'bold',
  	textAlign: "center"
  },
  contentContainer: {
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    opacity: 0.6,
    maxHeight: 100,
    paddingTop: 20,
    marginTop: 100
  },
  navText: {
  	color: "white",
  	fontWeight: "bold"
  }
})
const mapStateToProps = (state) => {
	return {
		firstName: state.userData.data.firstName,
		email: state.userData.data.email,
		password: state.userData.data.password,
		lastName: state.userData.data.lastName,
		messages: state.messages
	}
}

export default connect(mapStateToProps, { saveLocation })(Home);