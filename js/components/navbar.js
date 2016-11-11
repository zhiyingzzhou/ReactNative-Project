import React , { Component , PropTypes } from 'react';
import { View , Text , StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const TitleShape = {
	title:PropTypes.string.isRequired,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
	tintColor: PropTypes.string
}

const ButtonShape = {
	title: PropTypes.string.isRequired,
	style: PropTypes.oneOfType([PropTypes.object , PropTypes.array , PropTypes.number]),
	tintColor: PropTypes.string
}

export default class NavbarComponent extends Component {
	static defaultProps = {
	};

	static propTypes = {
		title:PropTypes.oneOfType([
			PropTypes.shape(TitleShape),
			PropTypes.element
		]),
		leftButton: PropTypes.oneOfType([
			PropTypes.shape(ButtonShape),
			PropTypes.element
		]),
		rightButton: PropTypes.oneOfType([
			PropTypes.shape(ButtonShape),
			PropTypes.element
		])
	};

	getButtonElement = (data={}) => {
		if(!!data.props) {
			return (
				<View>
					{data}
				</View>
			)
		}
		const colorStyle = data.tintColor ? {color:data.tintColor} : null;
		const style = data.style ? data.style : styles.navBarButtonText;

		return (
			<View style={styles.navBarButtonContainer}>
				<Text style={[style,colorStyle,]}>
					{data.title}
				</Text>
			</View>
		)
	}

	getTitleElement = (data) => {
		const colorStyle = data.tintColor ? {color: data.tintColor} : null;
		const style = data.style ? data.style : styles.navBarTitleText;

		return (
			<View style={styles.navBarTitleContainer}>
				<Text style={[style,colorStyle,]}>
					{data.title}
				</Text> 
			</View>
		)
	}

	render() {
		const {title,leftButton,rightButton} = this.props;
		return (
			<View style={styles.navBar}>
				{this.getTitleElement(title)}
				{this.getButtonElement(leftButton)}
				{this.getButtonElement(rightButton)}
			</View>
		)
	}
}

const NavbarColor = '#e74c3c',
NavbarHeight = 44;

const styles = StyleSheet.create({
	navBar: {
		backgroundColor: NavbarColor,
		height: NavbarHeight,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10
	},
	navBarTitleContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navBarTitleText: {
		fontSize: 17,
		fontWeight: '500',
		color: '#FFF'
	},
	navBarButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	navBarTitleText: {
		fontSize: 17,
		color: '#FFF',
	}
});