import React , {Component , PropTypes} from 'react';
import {ActivityIndicator , StyleSheet} from 'react-native';

export default class ActivityIndicatorComponent extends Component {
	static defaultProps = {
		animating: false
	}
	
	render() {
		const {animating} = this.props;
		return (
			<ActivityIndicator 
				animating={animating}
		        style={styles.showIndicator}
		        size="large"
			/>
		);
	}
}

const styles = StyleSheet.create({
	showIndicator: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
    	backgroundColor: 'rgba(0,0,0,.5)'
	}
});