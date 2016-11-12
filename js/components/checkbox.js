import React , { Component , PropTypes } from 'react';
import {View,StyleSheet,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../common';

export default class Checkbox extends Component {

	state = {};

	static defaultProps = {
		defaultValue: false,
	};

	static propTypes = {
		value: PropTypes.bool
	}

	componentDidMount() {
		const {defaultValue} = this.props;
		this.setState({
			value: defaultValue
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}

	_onPress = () => {
		const {checkEvent,unCheckEvent} = this.props;
		const {value} = this.state;
		if(value){
			if(unCheckEvent) unCheckEvent();
		}else{
			if(checkEvent) checkEvent();
		}
		this.setState({
			value: !value
		});
	}

	render() {
		const {value} = this.state;
		return (
			<TouchableWithoutFeedback onPress={this._onPress}>
				{!value 
					?
					<View style={styles.checkbox}></View>
					:
					<View style={[styles.checkbox , styles.checkboxHighlight]}>
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