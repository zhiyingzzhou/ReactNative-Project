import React , { Component } from 'react';
import {View,Text,StyleSheet,Animated,Easing,TouchableOpacity,ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ProductDetailParamsCountEditor extends Component {

	state = {
		fadeIn: new Animated.Value(0)
	};

	static defaultProps = {
		countNumber: 0,
		currentSelectedParams:{stock:0}
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	componentDidMount(){
		setTimeout(()=>{
			Animated.timing(this.state.fadeIn,{
				toValue: 1,
				duration: 100,
				easing: Easing.linear
			}).start();
		},300);
	}

	_onAddProduct = () => {
		const {countNumber,currentSelectedParams} = this.props,
		{stock} = currentSelectedParams;
		if( !stock || countNumber === stock ){
			ToastAndroid.show('库存不足!',ToastAndroid.SHORT);
		}else{
			this._setProductNumber(countNumber+1);
		}
	}
	_setProductNumber = num => {
		const {setProductNumber} = this.props;
		if(setProductNumber){
			setProductNumber(num);
		}
	}

	_onRemoveProduct = () => {
		const {countNumber} = this.props;
		if(countNumber > 0){
			this._setProductNumber(countNumber-1);
		}
	}

	render() {
		const {countNumber} = this.props;
		return (
			<Animated.View style={[styles.spaceBetween,{
				paddingHorizontal: 10,
				marginTop: 10,
				opacity: this.state.fadeIn
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
					}}>{countNumber}</Text>
					<TouchableOpacity onPress={this._onRemoveProduct}>
						<Icon 
							name='ios-remove-circle-outline'
							size={26}
						/>
					</TouchableOpacity>
				</View>
			</Animated.View>
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