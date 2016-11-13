import React , { Component } from 'react';
import {View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	ScrollView ,
	Modal ,
	Animated
} from 'react-native';
import ProductDetailParamsTarbar from './product-detail-params-tarbar';
import ProductDetailParamsHead from './product-detail-params-head';
import ProductDetailParamsList from './product-detail-params-list';
import ProductDetailParamsCountEditor from './product-detail-params-count-editor';

import U from '../../utils/util';
const pageHeight = U.getPageHeight(),
width = U.getScreenWidth();

export default class ProductDetailParams extends Component {
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
		const {priceAndStock,buyNumber,selectedAttrKeyArr} = this.state;
		const {data,top,modalVisible} = this.props;
		const style = modalVisible ? {top: 0} : {top: pageHeight};
		return (
			<View style={[styles.container,style]}>
				<Animated.View style={[styles.animatedView,{
					top: top.interpolate({
						inputRange:[0,1],
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
							<ProductDetailParamsList 
								getPrice = {this._getPrice}
								{...this.props} 
							/>
						}
						<ProductDetailParamsCountEditor 
							buyNumber={buyNumber}
							setBuyNumber={this._setBuyNumber}
							priceAndStock={priceAndStock} 
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
					<ProductDetailParamsHead 
							priceAndStock={priceAndStock} 
							{...this.props} 
							hideModalHandler={this._hideModalHandler} 
					/>
					<ProductDetailParamsTarbar
						{...this.props}
						buyNumber={buyNumber}
						selectedAttrKeyArr={selectedAttrKeyArr}
					/>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.5)',
	},
	animatedView: {
		position: 'absolute',
		height: pageHeight,
		width: width,
		backgroundColor: 'transparent',
	}
});