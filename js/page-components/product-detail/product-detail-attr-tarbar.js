import React , { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ToastAndroid,InteractionManager} from 'react-native';
import C from '../../config/config';
import U from '../../utils/util';
import SQLite from 'react-native-sqlite-storage';

const width = U.getScreenWidth(),
height = U.getScreenHeight();

export default class ProductDetailAttrTarbar extends Component {

	static defaultProps = {
	  buyNumber: 0
	}

	_onAddProductToCart = (): void=> {
		InteractionManager.runAfterInteractions(()=>{
			const {buyNumber,data,selectedAttrKeyArr,
				addProductToCart,priceAndStock} = this.props,
			{price,stock} = priceAndStock;
			if(!buyNumber){
				ToastAndroid.show('购买数量不能为0!',ToastAndroid.SHORT);
				return false;
			}
			if(buyNumber > stock){
				ToastAndroid.show('库存不足!',ToastAndroid.SHORT);
				return false;
			}
			const saveData = Object.assign({},data,{
				price: price,
				stock: stock
			},{count:buyNumber},{selectedAttrKeyArr:selectedAttrKeyArr});
			addProductToCart(saveData);
		});
	}

	_onBuyNow = () => {
		SQLite.deleteDatabase('Cart.db');
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._onAddProductToCart}>
					<View style={[styles.tarbarItem,{
						backgroundColor: '#FF9500'
					}]}>
						<Text style={styles.tarbarItemText}>加入购物车</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onBuyNow}>
					<View style={[styles.tarbarItem,{
						backgroundColor: '#ff3b30'
					}]}>
						<Text style={styles.tarbarItemText}>立即购买</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0
	},
	tarbarItem: {
		width: width/2,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},
	tarbarItemText: {
		fontSize: 17,
		color: '#FFF',
	}
});