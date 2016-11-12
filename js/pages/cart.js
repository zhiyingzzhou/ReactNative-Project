import React , { Component } from 'react';
import {View,Text} from 'react-native';
import {Page,BackNavBar} from '../components';
import {CartTabbar} from '../page-components/cart';

export default class CartPage extends Component {
	_editCart = () => {

	}
	render() {
		return (
			<Page>
				<BackNavBar 
					{...this.props} 
					rightButton={{title:'编辑',tintColor:'#FFF',onPress:this._editCart}}
				/>
				<CartTabbar />
			</Page>
		);
	}
}