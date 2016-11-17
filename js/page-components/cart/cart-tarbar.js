import React , { Component } from 'react';
import {View,Text,StyleSheet,Animated} from 'react-native';

import {CheckBox} from '../../components';
import U from '../../utils/util';
import {Colors} from '../../common';
const width = U.getScreenWidth();
export default class CartTarbarPage extends Component {
	
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	_checkEvent = (type: string): void=> {
		const {root} = this.props;
		root._productCheckboxRef.forEach(item=>{
			if(type === 'check'&&item.state.value === false){
				item._setCheckBoxHighlight();
				root._AddPriceAndCount(item.props.data);
			}
			if(type === 'uncheck'&&item.state.value === true){
				item._setCheckBoxDrak();
				root._minusPriceAndCount(item.props.data);
			}
		});

	}

	render() {
		const {Animatedbottom,totalPriceAndtotalCount,root,tarbarCheckboxValue} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.rightContainer}>
					<CheckBox 
						ref={ref=>root._tarbarCheckboxRef = ref}
						value={false}
						checkEvent={this._checkEvent.bind(this,'check')}
						unCheckEvent={this._checkEvent.bind(this,'uncheck')}
						tarbarCheckboxValue={tarbarCheckboxValue}
					/>
					<Text style={{
						marginLeft: 6
					}}>全选</Text>
				</View>
				<Animated.View style={[styles.leftContainer,{
					bottom: Animatedbottom.interpolate({
						inputRange: [0,1],
						outputRange: [0,50]
					})
				}]}>
					<View style={styles.priceContainer}>
						<Text style={styles.priceText}>
							总价:¥{Number(totalPriceAndtotalCount.price/100).toFixed(2)}
						</Text>
						<View style={{
							alignItems: 'flex-end'
						}}>
							<Text style={styles.priceText}>不含运费</Text>
						</View>
					</View>
					<View style={[styles.actionContainer,{
						width: width*.5,
						alignItems: 'center'
					}]}>
						<Text style={styles.actionText}>
							结算({totalPriceAndtotalCount.count})
						</Text>
					</View>
					
				</Animated.View>
				<Animated.View style={{
					flexDirection: 'row',
					position:'absolute',
					height: 50,
					right: 0,
					width: width*.7,
					bottom: Animatedbottom.interpolate({
						inputRange: [0,1],
						outputRange: [-50,0]
					})
				}}>
					<View style={styles.actionContainer}>
						<Text style={styles.actionText}>移到收藏</Text>
					</View>
					<View style={styles.actionContainer}>
						<Text style={styles.actionText}>删除</Text>
					</View>
				</Animated.View>
			</View>				
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		position:'absolute',
		bottom: 0,
		height: 50,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
	},
	rightContainer: {
		flexDirection: 'row',
		width: width*.3,
		alignItems: 'center'
	},
	leftContainer: {
		flexDirection: 'row',
		width: width*.7,
		position: 'relative',
	},
	priceContainer: {
		width: width *.3,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginRight: 10
	},
	priceText: {
		fontSize: 12,
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: width*.4,
		backgroundColor: Colors.buttonColor,
	},
	actionText: {
		color: '#FFF',
		fontSize: 17
	}
});