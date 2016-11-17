import React , { Component , PropTypes } from 'react';
import { View , Text , StyleSheet , TouchableOpacity , InteractionManager } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import U from '../../utils/util';
import {Colors} from '../../common';

class CartNumberComponent extends Component {

	static defaultProps = {
		cartNumber: 0
	};

	static propTypes = {
		cartNumber: PropTypes.number
	}

	render() {
		const {cartNumber} = this.props;
		if(!cartNumber){
			return null;
		}
		const style = cartNumber >= 10 ? {fontSize: 10} : {fontSize: 12};
		return (
			<View style={[styles.cartNumber,styles.center]}>
				<Text style={[styles.cartNumberText,style]}>{cartNumber}</Text>
			</View>
		);
	}
}

export default class ToolBar extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	_jumpToCartPage = () => {
		const {navigator,cartNumber} = this.props;
		if(navigator){
			InteractionManager.runAfterInteractions(()=>{
				navigator.push({
					title: '购物车',
					name: 'cart',
					params: {cartNumber:cartNumber}
				});
			});
		}
	}

	_addProductHandler = () => {
		const {showModal,data,addProductToCart} = this.props,
		customAttrArr = data.customAttr.length >0 ? JSON.parse(data.customAttr) : [];
		if(customAttrArr.length > 0&&showModal){
			showModal();
		}else{
			addProductToCart(Object.assign({},data,{selectedAttrKeyArr:[]}));
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
						<CartNumberComponent cartNumber={this.props.cartNumber} />
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