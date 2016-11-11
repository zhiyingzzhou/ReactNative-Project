import React , { Component , PropTypes } from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from './navbar';

export default class BackNavbar extends Component {

	static defaultProps = {
		backText: '返回',
	};

	static propTypes = {
		title: PropTypes.string.isRequired,
		backText: PropTypes.string,
		onPress:PropTypes.func,
		navigator:PropTypes.object
	};

	handlePress = () => {
		const {onPress,navigator} = this.props;
		if(onPress){
			onPress();
		}else if(navigator &&　navigator.getCurrentRoutes().length > 1){
			navigator.pop();
		}
	}

	render() {
		const {title,backText,onPress} = this.props;

		return (
			<Navbar 
				leftButton={
					<TouchableHighlight onPress={this.handlePress} underlayColor="#ccc">
						<View style={styles.navBarBackContainer}>
							<Ionicons 
								name='ios-arrow-back'
								size={24}
								color='#FFF'
							>
							</Ionicons>
							<Text style={styles.navBarBackText}>{backText}</Text>
						</View>
					</TouchableHighlight>
				}
				title={{title:title}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	navBarBackContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	navBarBackText: {
		marginLeft: 5,
		color: '#FFF'
	},
});