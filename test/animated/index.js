import React , { Component } from 'react';
import {View,Text,Animated,Easing,StyleSheet} from 'react-native';

export default class AnimatedView extends Component {
	constructor(props){
		super(props);
		this.state = {
			fadeInOpacity: new Animated.Value(0),
			rotation: new Animated.Value(0),
			fontSize: new Animated.Value(0)
		}
	}
	componentDidMount() {
		const timing = Animated.timing;
		Animated.parallel(['fadeInOpacity','rotation','fontSize'].map(property=>{
			return timing(this.state[property],{
				toValue: 1,
				duration: 1000
			})
		})).start();
	}
	render() {
		return (
			<Animated.View style={[styles.container,{
				opacity: this.state.fadeInOpacity,
				transform: [{
					rotateZ: this.state.rotation.interpolate({
						inputRange: [0,1],
						outputRange: ['0deg','360deg']
					})
				}]
			}]}>
				<Text style={styles.text}>1212</Text>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20
	}
});