import React , { Component , PropTypes } from 'react';
import { View , Text , StyleSheet , TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ItemCompoennt extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		after: PropTypes.string,
		style: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.array,
			PropTypes.object
		]),
		link:PropTypes.bool,
		onPress:PropTypes.func
	}

	handleClick = () => {
		const {onPress} = this.props;
		if(onPress){
			onPress();
		}
	}

	render() {
		const {title,after,style,link} = this.props;
		return 	(
					<View style={[style,]}>
						<TouchableHighlight onPress={()=>this.handleClick()} underlayColor='#CCC'>
							<View style={[styles.container,]}>
								<Text>
									{title}
								</Text>
								<View style={styles.after}>
									{after&&
										<Text style={styles.afterText}>{after}</Text>
									}
									{link&&
										<Icon 
											name="ios-arrow-forward"
											size={20}
											color="#ccc"
										/>
									}
								</View>
								{this.props.children}
							</View>
						</TouchableHighlight>
					</View>
				);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 44,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
	},
	after: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	afterText: {
		position: 'relative',
		color: '#c7c7cc'
	}
});