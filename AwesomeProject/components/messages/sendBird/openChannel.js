import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListView from "deprecated-react-native-listview";
import { sbCreateOpenChannelListQuery } from '../../../actions/openChannel.js'
import { Button, ListItem, Avatar } from 'react-native-elements';
import { getOpenChannelList } from "../../../actions/openChannelHelper.js";

class OpenChannel extends Component {
constructor(props) {
    super(props);

    this.state = {
        refresh: false,
        openChannelListQuery: null,
        list: [],
        openChannelList: ds.cloneWithRows([])
    }
}

    componentDidMount() {
        this._initOpenChannelList();
    }

    componentWillReceiveProps(props) {
        const { list } = props;
    
        if (list !== this.props.list) {
            if (list.length === 0) {
                this.setState({ 
                	list: [], 
                	openChannelList: ds.cloneWithRows([]) 
                });    
            } else {
                const newList = [...this.state.list, ...list];
                this.setState({ 
                	list: newList, 
                	openChannelList: ds.cloneWithRows(newList) 
                });
            }
        }
    }

    _initOpenChannelList = () => {
        this._getOpenChannelList(true);
    }

    _getOpenChannelList = (init) => {
        if (init) {
            const openChannelListQuery = sbCreateOpenChannelListQuery();
            this.setState({ 
            	openChannelListQuery 
            }, () => {
                this.props.getOpenChannelList(this.state.openChannelListQuery);        
            });
        } else {
            this.props.getOpenChannelList(this.state.openChannelListQuery);
        }
    }
    
    _onListItemPress = (channelUrl) => {
        // TODO: enter channel
    }

    _handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
            this.setState({ 
            	list: [], 
            	openChannelList: ds.cloneWithRows([]), 
            	refresh: true 
            }, () => {
                this._initOpenChannelList();
            });
        }
    }
    
    _renderList = (rowData) => {
    	console.log("rowData :", rowData)
        return (
            <ListItem
                component={TouchableHighlight}
                containerStyle={{backgroundColor: '#fff'}}
                key={rowData.url}
                avatar={(
                    <Avatar 
                        source={{uri: rowData.coverUrl}} 
                    />
                )}
                title={rowData.name.length > 30 ? rowData.name.substring(0, 26) + '...' : rowData.name}
                titleStyle={{fontWeight: '500', fontSize: 16}}
                onPress={ () => this._onListItemPress(rowData.url) }
            />
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    enableEmptySections={true}
                    renderRow={this._renderList}
                    dataSource={this.state.openChannelList}
                    onEndReached={() => this._getOpenChannelList(false)}
                    onEndReachedThreshold={-50}
                    onScroll={this._handleScroll}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps({ openChannel })  {
    // const { list } = openCha/nel;
    return { 
    	// list 
    };
}

export default connect(mapStateToProps, { getOpenChannelList })(OpenChannel);