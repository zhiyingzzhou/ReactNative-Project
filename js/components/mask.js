import React , { Component } from 'react';
import {View} from 'react-native';
import U from '../utils/util';

export default class MaskComponent extends Component {
	render() {
		return (
			<View style={{
					position: 'absolute',
					right: 0,
					left: 0,
					top: this.props.visible ? 0 : U.getScreenHeight(),
					bottom: 0,
					backgroundColor:'rgba(0,0,0,.3)'
				}}>
			</View>
		);
	}
}