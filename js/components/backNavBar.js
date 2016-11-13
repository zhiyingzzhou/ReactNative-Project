import React , { Component , PropTypes } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,InteractionManager} from 'react-native';
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
		InteractionManager.runAfterInteractions(()=>{
			const {onPress,navigator} = this.props;
			if(onPress){
				onPress();
			}else if(navigator &&　navigator.getCurrentRoutes().length > 1){
				navigator.pop();
			}
		});
	}

	render() {
		const {title,backText,onPress,rightButton} = this.props;
		return (
			<Navbar 
				leftButton={
					<TouchableOpacity onPress={this.handlePress}>
						<View style={styles.navBarBackContainer}>
							<Ionicons 
								name='ios-arrow-back'
								size={24}
								color='#FFF'
							>
							</Ionicons>
							<Text style={styles.navBarBackText}>{backText}</Text>
						</View>
					</TouchableOpacity>
				}
				title={{title:title}}
				rightButton={rightButton}
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