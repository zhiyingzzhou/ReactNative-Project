import React , { Component } from 'react';
import { View , Text , StyleSheet , TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import U from '../../utils/util';
import {Colors} from '../../common';

export default class CategoryTab extends Component {

	state = {tabs:[]};

	componentDidMount() {
		const {tabs} = this.props;
		if(tabs){
			this.setState({
				tabs:tabs
			});
		}
	}

	_changeTab = index => {
		const {tabs} = this.state;
		const {subscribeEvent} = this.props;

		let currentClickTabItem = tabs[index];
		if(currentClickTabItem.active){
			currentClickTabItem.order = !!currentClickTabItem.order ? 0 : 1;
		}else{
			tabs.map(item=>item.active = false);
			currentClickTabItem.active = true;
		}
		if(subscribeEvent){
			subscribeEvent(currentClickTabItem);
		}
		this.setState({
			tabs: tabs
		});
	}

	render() {
		const {tabs} = this.state;
		return (
			<View style={styles.tab}>
				{
					tabs.map( (item,index) => {
						let tabTextHighlight = null , IconColorHighlight= null;
						const style = index === tabs.length - 1 ? null : styles.tabItemWithRightBorder;
						if(item.active){
							tabTextHighlight = styles.tabTextHighlight;
							IconColorHighlight = Colors.themeColor;
						}
						return (
							<TouchableOpacity
								key={'_category_tab_'+index}
								activeOpacity = {0.4}
								onPress={this._changeTab.bind(this,index)}
							>
								<View
									style={[
										{
											width:U.getScreenWidth()/3,
											height: 44
										},
										styles.tabItem,
										style
									]}
								>  
									<Text style={[tabTextHighlight,]}>{item.name}</Text>
									<View style={{
										position: 'relative',
										top: 1
									}}>
										{!!item.order 
											?
											<Icon 
												name="ios-arrow-round-up"
												size={22}
												color={IconColorHighlight}
											/> 
											: 
											<Icon 
												name="ios-arrow-round-down"
												size={22}
												color={IconColorHighlight}
											/>
										}
									</View>
								</View>
							</TouchableOpacity>
						);
					})
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	tab: {
		flexDirection: 'row',
		backgroundColor: '#FFF',
		marginBottom: 10
	},
	tabItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center' 
	},
	tabItemWithRightBorder: {
		borderRightWidth: 0.36,
		borderColor: '#c7c7cc',
	},
	tabTextHighlight: {
		color: Colors.themeColor
	}
});