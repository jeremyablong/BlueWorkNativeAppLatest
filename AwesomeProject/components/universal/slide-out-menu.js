import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import { ListItem, Button as ElementsButton } from 'react-native-elements';
import { store } from "../../store/store.js";
import { connect } from "react-redux";
import { signOut } from "../../actions/index.js";

class Navbar extends Component {
constructor (props) {
	super(props);

	this.state = {
		isModalVisible: false
	}
}

	toggleModal = () => {
    	this.setState({ 
    		isModalVisible: !this.state.isModalVisible 
    	});
    };
    renderContent = () => {
    	const { firstName, lastName, email, password } = this.props;
    	if (firstName && lastName && email && password) {
    		return (
    		
				<View style={{ marginTop: 20 }}>
				    <ElementsButton 
				    	onPress={() => {
						this.props.signOut({})
						alert("You have signed out.")
				    }} 
						title="SIGN OUT" 
						style={styles.signin_button}> </ElementsButton>
				</View>
	
    		);
    	} else {
    		return (
    		<View>
				<View style={{ marginTop: 20 }}>
				    <ElementsButton 
				    	onPress={() => {
						this.props.navigation.navigate("login")
				    }} 
						title="SIGN IN" 
						style={styles.signin_button}> </ElementsButton>
				</View>
				<View>
				   <ElementsButton 
				    	onPress={() => {
						this.props.navigation.navigate("register")
				    }} 
						title="REGISTER" 
						style={styles.signup_button}> </ElementsButton>
				</View>
			</View>
    		);
    	}
    }
	render() {
		const { firstName, lastName, email, password } = this.props;
		return (
			  <View style={{ flex: 1 }}>
		        <ElementsButton title="Menu" style={{ color: "white" }} onPress={this.toggleModal} ></ElementsButton>
		        <Modal isVisible={this.state.isModalVisible}>
		          <View style={styles.menu}>
		            <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.");
		            		console.log("This is the props :", this.props);
		            		this.props.navigation.navigate('home')
		            	}}
				        leftAvatar={null}
				        title="Go To Homepage"
				        subtitle="This will take you back to the homepage"
				        bottomDivider
				    />
				{/*    <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("contact")
		            	}}
				        leftAvatar={null}
				        title="Go To Contact Page"
				        subtitle="This will take you to the contact page"
				        bottomDivider
				      />*/}
				      {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("main_map")
		            	}}
				        leftAvatar={null}
				        title="Visit our map with all of our job postings!"
				        subtitle="This will take you to the maps section of the avaliable jobs"
				        bottomDivider
				      /> : null}
				      <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("jobs_list")
		            	}}
				        leftAvatar={null} 
				        title="View Our Job Postings!"
				        subtitle="This will take you to the job postings page so you can browse our listings"
				        bottomDivider
				      />
				    {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("profile")
		            	}}
				        leftAvatar={null}
				        title="Profile"
				        subtitle="This will take you to your profile."
				        bottomDivider
				      /> : null}
				      {firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("messages_home")
		            	}}
				        leftAvatar={null}
				        title="Check out your messages through this link"
				        subtitle="This will take you to your messages homepage."
				        bottomDivider
				      /> : null}
					{firstName && lastName && email && password ? <ListItem 
		            	onPress={() => {
		            		this.props.navigation.navigate("signup_business_account")
		            	}}
				        leftAvatar={null}
				        title="Create A Job Posting!"
				        subtitle="This will take you to the job creation page."
				        bottomDivider
				      /> : null}
				    {/*<ListItem 
		            	onPress={() => {
		            		console.log("Menu item clicked.")
		            		this.props.navigation.navigate("profile")
		            	}}
				        leftAvatar={null}
				        title="Profile"
				        subtitle="This will take you to your profile."
				        bottomDivider
				      />*/}
					{this.renderContent()}
		            <View style={styles.buttonContainer}>
		            	<Button title="CLOSE THIS MENU" onPress={this.toggleModal} style={styles.bottomBtn}/>
		            </View>
		          </View>
		        </Modal>
		      </View>

		);
	}
}

const styles = StyleSheet.create({
	menu: {
 		flex: 1, 
 		backgroundColor: "white", 
 		height: "100%",
 		minHeight: "100%",
 		paddingTop: 60
	},
	buttonContainer: {
		flex: 1,
		bottom: 0,
		marginBottom: 20,
		width: "100%",
		minWidth: "100%",
		position: "absolute",
		justifyContent: 'center',
    	alignItems: 'center',
    	alignSelf: 'stretch'
	},
	bottomBtn: {
		alignSelf: 'stretch'
	},
	signin_button: {
		
	},
	signup_button: {
		marginTop: 20
	}
});

const mapStateToProps = (state) => {
	return {
		firstName: state.userData.data.firstName,
		email: state.userData.data.email,
		password: state.userData.data.password,
		lastName: state.userData.data.lastName
	}
}

export default connect(mapStateToProps, { signOut })(Navbar);