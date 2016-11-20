import React , { Component } from 'react';
import {View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	ScrollView ,
	Animated
} from 'react-native';
import ProductDetailAttrHead from './product-detail-attr-head';
import ProductDetailAttrList from './product-detail-attr-list';
import ProductDetailAttrTarbar from './product-detail-attr-tarbar';
import ProductDetailAttrCountEditor from './product-detail-attr-count-editor';

import U from '../../utils/util';
const pageHeight = U.getPageHeight(),
width = U.getScreenWidth();

export default class ProductDetailAttr extends Component {
	static defaultProps = {
		modalVisible: false
	};

	state = {
		priceAndStock: {price:0,stock:0},
		buyNumber: 0
	};

	_hideModalHandler = () => {
		const {hideModal} = this.props;
		if(hideModal){
			hideModal();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	_getPrice = selectedAttrKeyArr => {
		let price = 0,
		priceMap = null;
		const {data} = this.props;
		priceMap = data.priceMap;
		selectedAttrKeyArr.forEach(item=>{
			if(!priceMap.price){
				priceMap = priceMap[item];
			}
		});
		this.setState({
			selectedAttrKeyArr:selectedAttrKeyArr,
			priceAndStock:priceMap
		});
	}

	_setBuyNumber = num => {
		this.setState({
			buyNumber:num
		});
	}

	render() {
		const {data,top} = this.props;
		return (
			<Animated.View style={[styles.animatedView,{
				top: top.interpolate({
					inputRange: [0,1],
					outputRange: [pageHeight,0]
				})
			}]}>
				<TouchableWithoutFeedback onPress={this._hideModalHandler}>
					<View style={{
						height: pageHeight*.2,
						backgroundColor: 'transparent'
					}}>
					</View>
				</TouchableWithoutFeedback>
				<ScrollView style={{
					backgroundColor: '#FFF',
				}}>
					{Object.getOwnPropertyNames(data).length > 0 &&
						<ProductDetailAttrList 
							{...this.props} 
							getPrice = {this._getPrice}
						/>
					}
					<ProductDetailAttrCountEditor 
						{...this.state}
						setBuyNumber={this._setBuyNumber}
					/>
				</ScrollView>
				<View style={{
					position:'absolute',
					top: pageHeight*.2,
					height: 86,
					width: width,
					backgroundColor: '#FFF'
				}}>
				</View>
				<ProductDetailAttrHead 
						{...this.props} 
						{...this.state}
						hideModalHandler={this._hideModalHandler} 
				/>
				<ProductDetailAttrTarbar
					{...this.props}
					{...this.state}
				/>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	animatedView: {
		position: 'absolute',
		height: pageHeight,
		width: width,
		backgroundColor: 'transparent',
	}
});