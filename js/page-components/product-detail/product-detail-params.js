import React , { Component } from 'react';
import {View,
	Text,
	Animated , 
	Easing , 
	StyleSheet,
	TouchableWithoutFeedback,
	ScrollView
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
		top: new Animated.Value(0),
		currentSelectedParams: {price:0,stock:0},
		countNumber: 0
	};

	componentDidMount() {
		Animated.timing(this.state.top,{
			toValue: 1,
			duration: 200,
			easing: Easing.linear
		}).start();
	}

	_hideModalHandler = () => {
		const {hideModal} = this.props;
		if(hideModal){
			hideModal();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	_getPrice = selectedAttr => {
		let price = 0,
		priceMap = null;
		const {data} = this.props;
		priceMap = data.priceMap;
		selectedAttr.forEach(item=>{
			if(!priceMap.price){
				priceMap = priceMap[item];
			}
		});
		this.setState({
			selectedAttr:selectedAttr,
			currentSelectedParams:priceMap
		});
	}

	_setProductNumber = num => {
		this.setState({
			countNumber:num
		});
	}

	render() {
		const {top,currentSelectedParams,countNumber,selectedAttr} = this.state;
		const {data} = this.props;
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.animatedView,{
					top:top.interpolate({
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
						<ProductDetailParamsList 
							getPrice = {this._getPrice}
							{...this.props} 
						/>
						<ProductDetailParamsCountEditor 
							countNumber={countNumber}
							setProductNumber={this._setProductNumber}
							currentSelectedParams={currentSelectedParams} 
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
							currentSelectedParams={currentSelectedParams} 
							{...this.props} 
							hideModalHandler={this._hideModalHandler} 
					/>
					<ProductDetailParamsTarbar
						{...this.props}
						countNumber={countNumber}
						selectedAttr={selectedAttr}
					/>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.5)',

	},
	animatedView: {
		height: pageHeight,
		backgroundColor: '#FFF',
		position: 'absolute',
		left: 0,
		right: 0,
		backgroundColor: 'transparent'
	}
});