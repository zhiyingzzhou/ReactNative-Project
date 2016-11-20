import React , { Component , PropTypes } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import U from '../../utils/util';
import {Colors} from '../../common';
const width = U.getScreenWidth();

export default class CartEmpty extends Component {

	static propTyps = {
		onPress: PropTypes.func
	};

	static defaultProps = {
		onPress: () => {}
	};

	_onPress = () => {
		const {onPress} = this.props;
		if(onPress){
			onPress();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{
					color: '#6d6d72',
					marginBottom: 15
				}}>
					你的购物车空空如也
				</Text>
				<TouchableOpacity onPress={this._onPress} activeOpacity={0.7}>
					<View style={styles.button}>
						<Text style={{
							color: '#FFF'
						}}>
							继续浏览
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		height: 44,
		width: width*.8,
		backgroundColor: Colors.themeColor,
		justifyContent: 'center',
		alignItems: 'center'
	}
});