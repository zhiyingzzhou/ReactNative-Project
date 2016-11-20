import React , { Component , PropTypes } from 'react';
import {View,
	Text,
	TouchableHighlight,
	StyleSheet,
	Animated,
	PanResponder,
	InteractionManager
} from 'react-native';

const buttonDefaultWidth = 80;

export default class Swipeout extends Component {

	static defaultProps = {
		rightButton: [],
		duration: 150
	}

	state = {
		isOpen: false,
		RowTranslateX: new Animated.Value(0),
		sensitivity:5
	}

	_getRightButtonContainerWidth(){
		const {rightButton} = this.props;
		widthArr = [];
		rightButton.forEach(item=>{
			widthArr.push(item.width || buttonDefaultWidth);
		});
		return widthArr.reduce((pre,cur)=>{
			return pre+cur;
		});
	}

	componentWillMount() {
		this._onPanResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt,gestureState) => {
				return this.state.isOpen ? true : false;
			},
			onStartShouldSetPanResponderCapture: (evt,gestureState) => {
				return this.state.isOpen ? true : false;
			},
			onMoveShouldSetPanResponder: (evt,gestureState) => {
				return Math.abs(gestureState.dx) > this.state.sensitivity || 
				Math.abs(gestureState.dy) > this.state.sensitivity;
			},
			onMoveShouldSetPanResponderCapture: (evt,gestureState) => {
				return Math.abs(gestureState.dx) > this.state.sensitivity || 
				Math.abs(gestureState.dy) > this.state.sensitivity;
			},
			onPanResponderMove: (evt,gestureState) => this._onPanResponderMove(evt,gestureState),
			onPanResponderRelease: (evt,gestureState) => this._onPanResponderRelease(evt,gestureState),
			onPanResponderTerminate: (evt,gestureState) => this._onPanResponderTerminate(evt,gestureState)
		});
	}

	_onPanResponderMove(evt,gestureState) {
		//关闭其他打开的row
		const {root,rowId} = this.props;
		if(root.openRowId&&root.openRowId !== rowId &&root.openRowId.length > 0){
			root._dataRow[root.openRowId]._close();
		}

		let dx;
		dx = gestureState.dx;
  		if(this.state.isOpen){
		 	dx = -this._getRightButtonContainerWidth() + dx;
	 	}
	 	if(dx <= 0 || this.state.RowTranslateX !== 0){
 			this.setState({
	 			RowTranslateX: new Animated.Value(dx)
			});
	 	}
	}

	_onPanResponderRelease(evt,gestureState) {
		const buttonContainerWidth = this._getRightButtonContainerWidth();
		let dx = gestureState.dx;
  		if(!this.state.isOpen){
  			
  			if(dx <= -(buttonContainerWidth/2)){
  				this._setRowOpenState(true);
  				this._moving(this.state.RowTranslateX,-buttonContainerWidth);
  			}else{
  				this._moving(this.state.RowTranslateX,0);
  			}
  		}

  		if(this.state.isOpen){
  			if(dx >= 0){
  				this._setRowOpenState(false);
  				this._moving(this.state.RowTranslateX,0);
  			}else{
  				this._moving(this.state.RowTranslateX,-buttonContainerWidth);
  			}
  		}
	}

	_onPanResponderTerminate(evt,gestureState) {
		this._moving(this.state.RowTranslateX,0,false);
	}

	_setRowOpenState(bool){
		const {root,rowId} = this.props;
		if(bool) {
			root.openRowId = rowId;
		}else{
			root.openRowId = '';
		}
		this.setState({
			isOpen: bool
		});
	}

	_moving (k,v){
		InteractionManager.runAfterInteractions(()=>{
			Animated.timing(k,{
				toValue: v,
				duration: this.props.duration
			}).start();
		});
	}

	_onPressHandler = onPress => {
		if(onPress){
			if(this.props.autoClose){
				this._close();
			}
			InteractionManager.runAfterInteractions(()=>{
				onPress();
			});
		}
	}

	_close(){
		this._setRowOpenState(false);
		this._moving(this.state.RowTranslateX,0);
	}

	_renderRightButton() {
		let Element = [];
		const {rightButton} = this.props;
		if(rightButton.length === 0){
			return null;
		}
		rightButton.forEach((item,index)=>{
			const {tintColor,onPress,underlayColor} = item;
			const style = item.style ? item.style : null;
			Element.push(
				<TouchableHighlight 
					key={'_button_'+index}
					style={{flex:1}}
					onPress={this._onPressHandler.bind(this,onPress)}
					underlayColor={underlayColor ? underlayColor : null}
				>
					<View style={[styles.singleRightButton,style]}>
						<Text style={{
							color: tintColor ? tintColor : null
						}}>
							{item.text}
						</Text>
					</View>
				</TouchableHighlight>
			);
		});
		return Element;
	}

	render() {
		const {style} = this.props;
		return (
			<View style={[styles.container,style]}>
				<View style={[styles.rightButtonContainer,{
					width: this._getRightButtonContainerWidth()
				}]}>
					{this._renderRightButton()}
				</View>
				<Animated.View ref="animted" {...this._onPanResponder.panHandlers} style={{
					transform: [{
						translateX: this.state.RowTranslateX
					}]
				}}>
					{this.props.children}
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rightButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 0,
		right: 0
	},
	singleRightButton: {
		width: buttonDefaultWidth,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center'
	}
});