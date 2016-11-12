import React , { Component } from 'react';
import { View , Text , Animated , Easing , StyleSheet , Dimensions , TouchableHighlight } from 'react-native';

const screen = Dimensions.get('window');
const height = screen.height - 50;
export default class AnimatedComponent extends Component {
	state = {
		translateY: new Animated.Value(0)
	}
	componentDidMount() {
		
    }
    _startAnimated = () => {
    	Animated.timing(this.state.translateY,{
			toValue: 1,
			duration: 300,
			easing: Easing.linear
		}).start();
    }
	render() {
		
		return (
			<View style={{
				flex: 1,
				backgroundColor: '#CCC'
			}}>
				<TouchableHighlight onPress={this._startAnimated}>
					<View style={styles.button}>
						<Text style={{color:'#FFF'}}>开始动画</Text>
					</View>
				</TouchableHighlight>
				<Animated.View style={[styles.animatedView,{
					transform: [{
						translateY:this.state.translateY.interpolate({
							inputRange: [0,1],
							outputRange: [height,50]
						})
					}]
				}]}>
					<View>
						<Text>商品属性</Text>
					</View>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 100,
		height: 50,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	},
    animatedView: {
    	flex: 1,
		backgroundColor: 'green',
		transform: [{
			translateY: height
		}]
    },
});