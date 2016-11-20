import React , { Component } from 'react';
import {View,Text,Image,StyleSheet,TouchableWithoutFeedback,PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import U from '../../utils/util';
import {Colors} from '../../common';
const pageHeight = U.getPageHeight(),
width = U.getScreenWidth();

export default class ProductDetailAttrHead extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.priceAndStock !== this.props.priceAndStock;
	}

	render() {
		const {data,hideModalHandler,priceAndStock} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image 
						source={{uri:data.coverIcon}}
						style={{
							width:100,
							height:100,
						}}
					/>
				</View>
				<View style={styles.rightContainer}>
					<View>
						<Text style={{
							fontSize: 16
						}}>
							¥{Number(priceAndStock.price/100).toFixed(2)}
						</Text>
						<Text style={{
							fontSize: 13
						}}>
							库存 {priceAndStock.stock}件
						</Text>
					</View>
					<TouchableWithoutFeedback onPress={hideModalHandler}>
						<View>
							<Icon 
								name='ios-close-circle-outline'
								size={26}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: pageHeight*.2-32,
		paddingHorizontal: 10,
		flexDirection: 'row',
		borderBottomWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor,
		width: width,
		height: 118,
	},
	leftContainer: {
		backgroundColor: '#FFF',
		borderWidth: .4,
		borderColor: '#ddd',
		borderStyle: 'solid',
		width: 105,
		height: 105,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rightContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 40,
		height: 73,
		marginLeft: 10,
	}
});