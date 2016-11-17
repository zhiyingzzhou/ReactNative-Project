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

	componentDidMount() {
		this.setState({
			value: this.props.value
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state || nextProps !== this.props;
	}

	_onPress = () => {
		const {checkEvent,unCheckEvent,data={}} = this.props,
		{value} = this.state;
		if(value){
			if(unCheckEvent) unCheckEvent(data);
		}else{
			if(checkEvent) checkEvent(data);
		}
		this.setState({
			value: !value
		});
	}

	_setCheckBoxHighlight =() =>{
		this.setState({
			value: true
		});
	}

	_setCheckBoxDrak=()=>{
		this.setState({
			value:false
		});
	}

	render() {
		const {style} = this.props,
		{value} = this.state;
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