import React , { Component , PropTypes } from 'react';
import { View , Text , StyleSheet , TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import U from '../../utils/util';
import {Colors} from '../../common';

class CartNumber extends Component {

	static defaultProps = {
		number: 8
	};

	static propTypes = {
		number: PropTypes.number
	}

	render() {
		const {number} = this.props;
		if(!number){
			return null;
		}
		const style = number >= 10 ? {fontSize: 10} : {fontSize: 12};
		return (
			<View style={[styles.cartNumber,styles.center]}>
				<Text style={[styles.cartNumberText,style]}>{number}</Text>
			</View>
		);
	}
}

export default class ToolBar extends Component {

	_jumpToCartPage = () => {
		const {navigator} = this.props;
		if(navigator){
			navigator.push({
				title: '购物车',
				name: 'cart'
			});
		}
	}

	_addProductHandler = () => {
		const {showModal,data} = this.props;
		const {customAttr} = data;
		if(customAttr&&customAttr.length > 0&&showModal){
			showModal();
		}else{
			alert('加入购物车');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={this._jumpToCartPage}
				>
					<View style={[styles.cart , styles.center , styles.borderRight]}>
						<Icon 
							name="ios-cart-outline"
							size={20}
						/>
						<Text style={styles.cartText}>购物车</Text>
						<CartNumber />
					</View>
				</TouchableOpacity>
				<View style={[styles.favorite , styles.center , styles.borderRight]}>
					<Icon 
						name="ios-heart-outline"
						size={20}
					/> 
					<Text style={styles.favoriteText}>收藏</Text>
				</View>
				<TouchableOpacity onPress={this._addProductHandler}>
					<View style={[styles.colAHalf , styles.center , styles.toolbarButton]}>
						<Text style={styles.toolbarButtonText}>加入购物车</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 50
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	borderRight: {
		borderRightWidth: 0.4,
		borderColor: 'rgba(0,0,0,.3)',
		borderStyle: 'solid'
	},
	cart: {
		flex: 1,
		width: U.getScreenWidth()/4,
	},
	cartText: {
		fontSize: 10,
	},
	favorite: {
		width: U.getScreenWidth()/4
	},
	favoriteText: {
		fontSize: 10,
	},
	toolbarButton: {
		flexDirection: 'row',
		backgroundColor: Colors.buttonColor,
		width: U.getScreenWidth()/2,
		height: 50
	},
	toolbarButtonText: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '500',
	},
	cartNumber: {
		backgroundColor: Colors.themeColor,
		height: 16,
		width: 16,
		borderRadius: 16,
		paddingBottom: 1,
		position: 'absolute',
		top: 5,
		left: U.getScreenWidth()/8+5,
	},
	cartNumberText: {
		color: '#FFF',
	}
});