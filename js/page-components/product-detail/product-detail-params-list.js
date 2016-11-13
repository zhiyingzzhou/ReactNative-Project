import React , { Component } from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native';

import {Colors} from '../../common';

export default class ProductDetailParamsList extends Component {

	state = {
		customAttr:[]
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data || nextState !== this.state;
	}

	componentDidMount() {
		let selectedAttrKeyArr = [];
		const {data} = this.props;
		customAttr = data&&data.customAttr&&data.customAttr.length > 0 ? JSON.parse(data.customAttr) : [];
		customAttr.map(item=>{
			selectedAttrKeyArr.push(item.val[0].key);
		});
		if(selectedAttrKeyArr.length > 0){
			this._getPrice(selectedAttrKeyArr);
		}
		this.setState({
			customAttr:customAttr,
			selectedAttrKeyArr:selectedAttrKeyArr
		});
	}

	_getPrice = selectedAttrKeyArr => {
		const {getPrice} = this.props;
		if(getPrice){
			getPrice(selectedAttrKeyArr);
		}
	}

	_changeParams = (item,i) => {
		const {selectedAttrKeyArr} = this.state;
		if(selectedAttrKeyArr[i] !== item.key){
			selectedAttrKeyArr[i] = item.key;
			this._getPrice(selectedAttrKeyArr);
			this.setState({
				selectedAttrKeyArr: selectedAttrKeyArr
			});
		}
	}

	_renderItem = (arr,i) => {
		const {selectedAttrKeyArr} = this.state;
		let Element = [];
		arr.map((item,index)=>{
			const backgroundColor = item.key === selectedAttrKeyArr[i] ? Colors.themeColor : '#ccc';
			Element.push(
				<TouchableWithoutFeedback 
						key={'_params_item_'+index} 
						onPress={this._changeParams.bind(this,item,i)}
				>
					<View style={[styles.item,{
						backgroundColor: backgroundColor,
					}]}>
						<Text style={{
							color: '#FFF'
						}}>{item.val}</Text>
					</View>
				</TouchableWithoutFeedback>
			)
		});
		return Element;
	}

	_renderList = arr => {
		let Element = [];
		arr.map((item,index)=>{
			Element.push (
				<View key={'_params_list_'+index}>
					<Text style={{
						marginBottom: 8,
						color: '#666',
						fontSize: 13
					}}>{item.text}</Text>
					<View style={{
						flexDirection: 'row',
						flexWrap: 'wrap'
					}}>
						{item.val&&this._renderItem(item.val,index)}
					</View>
				</View>
			)
		})
		return Element;
	}

	render() {
		const {customAttr} = this.state;
		if(customAttr.length === 0){
			return null;
		}
		return (
			<View style={{
				marginTop: 100,
				paddingBottom: 10,
				paddingHorizontal: 10,
				borderBottomWidth: 0.5,
				borderColor: '#ccc'
			}}>
				{this._renderList(customAttr)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 34,
		marginRight: 5,
		marginBottom: 5,
		paddingHorizontal: 6,
		borderRadius: 5,
	}
});