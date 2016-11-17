import React , { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ProductDetailAttrCountEditor extends Component {

	static defaultProps = {
		buyNumber: 0,
		priceAndStock:{stock:0}
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	_onAddProduct = () => {
		const {buyNumber,priceAndStock} = this.props,
		{stock} = priceAndStock;
		if( !stock || buyNumber === stock ){
			ToastAndroid.show('库存不足!',ToastAndroid.SHORT);
		}else{
			this._setBuyNumber(buyNumber+1);
		}
	}
	_setBuyNumber = num => {
		const {setBuyNumber} = this.props;
		if(setBuyNumber){
			setBuyNumber(num);
		}
	}

	_onRemoveProduct = () => {
		const {buyNumber} = this.props;
		if(buyNumber > 0){
			this._setBuyNumber(buyNumber-1);
		}
	}

	render() {
		const {buyNumber} = this.props;
		return (
			<View style={[styles.spaceBetween,{
				paddingHorizontal: 10,
				marginTop: 10,
			}]}>
				<Text>
					购买数量
				</Text>
				<View style={styles.spaceBetween}>
					<TouchableOpacity onPress={this._onAddProduct}>
						<Icon 
							name='ios-add-circle-outline'
							size={26}
						/>
					</TouchableOpacity>
					<Text style={{
						marginHorizontal: 8,
						fontSize: 17
					}}>{buyNumber}</Text>
					<TouchableOpacity onPress={this._onRemoveProduct}>
						<Icon 
							name='ios-remove-circle-outline'
							size={26}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	spaceBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
});