import React , { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ToastAndroid,InteractionManager} from 'react-native';
import Storage from 'react-native-storage';

import U from '../../utils/util';
const width = U.getScreenWidth(),
height = U.getScreenHeight();

export default class ProductDetailParamsTarbar extends Component {

	_onAddProduct = () => {
		const {data,buyNumber,selectedAttrKeyArr} = this.props;
		InteractionManager.runAfterInteractions(()=>{
			if(!buyNumber){
				ToastAndroid.show('购买数量不能为0!',ToastAndroid.SHORT);
				return false;
			}
			console.log(Storage);
			Storage.getAllDataForKey('cart')
			.then(ret=>{
				console.log(ret);
			})
			.catch(err=>{
				console.log(err);
			});
		});
		
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._onAddProduct}>
					<View style={[styles.tarbarItem,{
						backgroundColor: '#FF9500'
					}]}>
					<Text style={styles.tarbarItemText}>加入购物车</Text>
				</View>
				</TouchableOpacity>
				<TouchableOpacity>
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