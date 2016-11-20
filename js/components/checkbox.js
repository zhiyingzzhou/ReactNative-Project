import React , { Component , PropTypes } from 'react';
import {View,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../common';

export default class Checkbox extends Component {

	state = {};

	static defaultProps = {
		value: false,
		style: null
	};

	static propTypes = {
		value: PropTypes.bool,
		style: PropTypes.oneOfType([PropTypes.array,PropTypes.object,PropTypes.number])
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state || nextProps !== this.props;
	}

	_onPress = () => {
		const {checkEvent,unCheckEvent,value} = this.props;
		if(value){
			if(unCheckEvent) unCheckEvent();
		}else{
			if(checkEvent) checkEvent();
		}
	}

	render() {
		const {style,value} = this.props;
		return (
			<TouchableWithoutFeedback onPress={this._onPress}>
				{!value 
					?
					<View style={[styles.checkbox,style]}></View>
					:
					<View style={[styles.checkbox , styles.checkboxHighlight,style]}>
						<Icon 
							name='ios-checkmark'
							size={30}
							color='#FFF'
						/>
					</View>
				}
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 20,
		borderWidth: 0.4,
		borderColor: 'rgba(0,0,0,.4)'
	},
	checkboxHighlight: {
		backgroundColor:Colors.themeColor,
		borderWidth: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});