import React , { Component } from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native';

import {Colors} from '../../common';

export default class ProductDetailParamsList extends Component {

	state = {
		price: 0,
		customAttr:[]
	};

	componentDidMount() {
		setTimeout(()=>{
			let selectedAttr = [];
			const {data} = this.props,
			customAttr = data&&data.customAttr&&data.customAttr.length > 0 ? JSON.parse(data.customAttr) : [];
			customAttr.map(item=>{
				selectedAttr.push(item.val[0].key);
			});
			if(selectedAttr.length > 0){
				this._getPrice(selectedAttr);
			}
			this.setState({
				customAttr:customAttr,
				selectedAttr:selectedAttr
			});
		},250);
	}

	_getPrice = selectedAttr => {
		const {getPrice} = this.props;
		if(getPrice){
			getPrice(selectedAttr);
		}
	}

	_changeParams = (item,i) => {
		const {selectedAttr} = this.state;
		if(selectedAttr[i] !== item.key){
			selectedAttr[i] = item.key;
			this._getPrice(selectedAttr);
			this.setState({
				selectedAttr: selectedAttr
			});
		}
	}

	_renderItem = (arr,i) => {
		const {selectedAttr} = this.state;
		let Element = [];
		arr.map((item,index)=>{
			const backgroundColor = item.key === selectedAttr[i] ? Colors.themeColor : '#ccc';
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