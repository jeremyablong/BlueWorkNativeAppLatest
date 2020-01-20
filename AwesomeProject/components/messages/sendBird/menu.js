import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { sendbirdLogout, initMenu } from '../../../actions/disconnectHelper.js';
import { Button } from 'react-native-elements';

class SendBirdMenu extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}

    componentWillMount() {
        this.props.initMenu();
    }

    // componentWillReceiveProps(props) {
    //     const { isDisconnected } = props;
    //     if (isDisconnected) {
    //         this.props.navigation.navigate("home")
    //         this.setState({ 
    //             isLoading: false 
    //         }, () => {
    //             this.props.navigation.dispatch(resetAction);
    //         })
    //     }
    // }

    _onProfileButtonPress = () => {
        // TODO: Profile screen
        this.props.navigation.navigate("sendbird_profile");
    }

    _onOpenChannelPress = () => {
        // TODO: OpenChannel screen
        this.props.navigation.navigate("sendbird_open_channel");
    }

    _onGroupChannelPress = () => {
        // TODO: GroupChannel screen
    }

    _onDisconnectButtonPress = () => {
        this.props.sendbirdLogout();
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'user', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Profile'
                    onPress={this._onProfileButtonPress}
                />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'slack', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Open Channel' 
                    onPress={this._onOpenChannelPress}
                />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'users', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Group Channel' 
                    onPress={this._onGroupChannelPress}
                />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#7d62d9'
                    color='#6e5baa'
                    icon={{name: 'sign-out', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='Disconnect' 
                    onPress={this._onDisconnectButtonPress}
                />

                <View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerViewStyle: {
        backgroundColor: '#fff', 
        flex: 1
    },
    menuViewStyle: {
        marginLeft: 0,
        marginRight: 0
    },
    buttonStyle: {
        justifyContent: 'flex-start',
        paddingLeft: 14
    }
});

function mapStateToProps({ menu }) {
    // const { isDisconnected } = menu;
    return { 
        // isDisconnected 
    };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu })(SendBirdMenu);