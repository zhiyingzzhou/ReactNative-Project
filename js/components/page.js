import React , { Component } from 'react';
import { View , StyleSheet } from 'react-native';

export default class PageComponent extends Component {
	render() {
		return 	(
					<View style={styles.pageContainer}>
						{this.props.children}
					</View>
				);
	}
}

const styles = StyleSheet.create({
	pageContainer: {
		backgroundColor: '#efeff4',
		flex: 1,
	}
});