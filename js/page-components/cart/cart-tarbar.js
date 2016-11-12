import React , { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';

import {CheckBox} from '../../components';
import U from '../../utils/util';
import {Colors} from '../../common';

export default class CartTarbarPage extends Component {
	
	_checkEvent = () => {
	}

	_unCheckEvent = () => {
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<View style={{flexDirection: 'row'}}>
						<CheckBox 
							defaultValue={false}
							checkEvent={this._checkEvent}
							unCheckEvent={this._unCheckEvent}
						/>
						<Text style={{
							marginLeft: 6
						}}>全选</Text>
					</View>
					<View style={styles.price}>
						<Text style={styles.priceText}>总价:¥ 0.00</Text>
						<View style={{
							alignItems: 'flex-end'
						}}>
							<Text style={styles.priceText}>不含运费</Text>
						</View>
					</View>
				</View>
				<View style={styles.balance}>
					<Text style={styles.balanceText}>结算(0)</Text>
				</View>
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
		backgroundColor: '#FFF',
	},
	leftContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		width: U.getScreenWidth()*0.6
	},
	price: {

	},
	priceText: {
		fontSize: 12,
	},
	balance: {
		width: U.getScreenWidth()*0.4,
		backgroundColor: Colors.buttonColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	balanceText: {
		color: '#FFF',
		fontSize: 17
	}
});