import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableHighlight, Animated, Image } from "react-native";
import { SearchBar, Header, Button as ElementsButton } from "react-native-elements";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocode from "react-geocode";
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDSTHo-QfCcFzb1Tn-lA0uL3Q-rOGdhkcQ");
Geocode.setLanguage("en");
Geocode.setRegion("us");
Geocode.enableDebug();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LATITUD_DELTA = 0.0922;
		
const LONGITUDE_DELTA = LATITUD_DELTA + (width / height);

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]



class SearchZip extends Component {
constructor () {
	super();

	this.state = {
		query: "",
		zipCode: "",
		itemsFromMapping: null,
		latitude: 0,
		longitude: 0,
		mapArray: [],
		markers: [],
		coordinates: null,
		geoLocation: null,
		coordinates: null,
		array: [],
		mapReady: false,
		lat: 35.227085,
		lng: -80.843124,
		region: null,
		description: ""
	}
}	
	updateSearch = (value) => {
		this.setState({
			query: value
		}, () => {
			axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobs/map/zipCode", {
				zipCode: this.state.query
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
	}
    componentWillMount() {
	    this.index = 0;
	    this.animation = new Animated.Value(0);
    }
	handleSubmit = () => {
		
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/map/findAll", {
			search: this.state.query
		}).then((res) => {
			this.setState({
				data: res.data
			}, () => {
				this.setState({
					region: {
						latitude: 35.227085,
						longitude: -120.843124,
						longitudeDelta: LONGITUDE_DELTA,
						latitudeDelta: LATITUD_DELTA

					}
				})
			return this.state.data.map((item) => {
				if (item.businessDetails) {
					return item.businessDetails.map((i, idx) => {
						if (i.streetAddress) {
							Geocode.fromAddress(i.streetAddress).then(
							  response => {
							    const { lat, lng } = response.results[0].geometry.location;
							    let newObj = {
									latitude: lat,
									longitude: lng,
									description: "hello there",
									title: "title"
							    };
							    this.setState({
									markers: [
										...this.state.markers,
										newObj
									],
									
							    })
							  },
							  error => {
							    console.error("This is the eroror for the geocode api :", error);
							  }
							);
						
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
	}
	componentDidMount () {
		
		// navigator.geolocation.getCurrentPosition(
		//   position => {
		  	
		//     const location = JSON.stringify(position);

		//     this.setState({ 
		//     	location 
		//     });
		//   },
		//   error => Alert.alert(error.message),
		//   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		// );

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
						if (i.streetAddress) {
							Geocode.fromAddress(i.streetAddress).then(
							  response => {
							    const { lat, lng } = response.results[0].geometry.location;
							    let newObj = {
									latitude: lat,
									longitude: lng,
									description: "componentDidMount",
									title: "title"
							    };
							    this.setState({
									markers: [
										...this.state.markers,
										newObj
									]
							    })
							  }
							);
						
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
	}

	readyMap = () =>  {
		this.setState({
			mapReady: true
		})
	}
	markerClick = ()  => {

	}
	onRegionChange = () => {

	}
	render() {

		console.log("REGIONNNNN:", this.state.region);
		console.log("Markers :", this.state.markers);
		return (
			<View>
				<SearchBar
			        placeholder="Search your ZIP-CODE here..."
			        onChangeText={this.updateSearch}
			        value={this.state.query} 
		      	/>
				<ElementsButton onPress={() => {
					this.handleSubmit()
				}} style={styles.submitSearchBtn} title="Search The Map For Jobs"> </ElementsButton>
					
				<View style={styles.mapView}>
			      	<MapView 
			      		 ref={map => this.map = map}
			      	     showsUserLocation={true}
				         style={{ flex: 1, height: '100%', width: '100%', zIndex: 0 }}
				         showsUserLocation 
				         provider={PROVIDER_GOOGLE}
				         onLayout={this.readyMap} 
				         region={this.state.region}
				    	 initialRegion={this.state.region}
				         onRegionChangeComplete={(region) => {
				         	this.setState({
				         		region: region
				         	}, () => {
				         		
				         		console.log("Region CALLBACK.")
				         	})
				         	console.log("Region changed to :", region);
				         }}
				         onRegionChange={this.onRegionChange}
				      > 

				
				    {this.state.markers ? this.state.markers.map((item, index) => {
				    	console.log("marker item :", item)
				    	return (
				    	<View key={index}>
							<Marker 
			                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
			                    title={item.title}
			                    description={item.description}
								onPress={() => {
									console.log("marker pressed.")
								}}>
			                    
			                </Marker>
							
					    </View>
				    	);

				    }) : console.log("THIS.STATE.MARKERS NOT RECOGNIZED.")}

				 

				
				    </MapView>
				</View>
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
	submitSearchBtn: {

	},
	mapView: {
		minHeight: "100%",
		height: "100%",
		flex: 1
	},
	  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

export default SearchZip;
