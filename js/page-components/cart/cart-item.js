import React , { Component } from 'react';
import {View,Text,Image,StyleSheet,PanResponder,Animated,PixelRatio,TouchableOpacity} from 'react-native';
import {CheckBox,SwipeOut} from '../../components';

import {Colors} from '../../common';

type attr = {
	text: string,
	val: Array,
	id: string
}

type val = {
	val: string,
	key: string
}

export default class CartItem extends Component {

	static defaultProps = {
		rowData: {data:{}}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.rowData !== this.props.rowData;
	}

	_rightButtonConfigure(): Array{
		return [
			{
				text: '删除',
				tintColor: '#FFF',
				style:{backgroundColor:'rgb(239, 3, 28)'},
				onPress: () => {alert('test');},
				underlayColor: '#FFF'
			}
		]
	}

	_getAttrText = (data: Object): string=> {
		let attrText: string= '',
		{customAttr,selectedAttrKeyArr} = data,
		customAttrArr: Array = customAttr && JSON.parse(customAttr);
		if(selectedAttrKeyArr&&selectedAttrKeyArr.length>0){
			customAttrArr.forEach((item: attr,index)=>{
				item.val.forEach((val: val)=>{
					if(val.key === selectedAttrKeyArr[index]){
						attrText += item.text + ':' + val.val;
					}
				});
				if(index !== (customAttrArr.length - 1)){
					attrText += ',';
				}
			});
			return attrText.length > 20 ? attrText.substr(0,20)+'...' : attrText;
		}
		return '';
	}

	_checkEvent = (data: Object): void => {
		const {root} = this.props;
		root._listenerCheckBoxState(true);
		root._AddPriceAndCount(data);
	}

	_unCheckEvent = (data: Object): void=> {
		const {root} = this.props;
		root._listenerCheckBoxState(false);
		root._minusPriceAndCount(data);
	}

	render() {
		const {rowData,rowId,root} = this.props,
		{data,count} = rowData;
		return (
			<SwipeOut 
				rowId={rowId}
				root={root}
				ref={(rowRef)=>root._dataRow[rowId] = rowRef}
				rightButton={this._rightButtonConfigure()}
				style={{
					borderBottomWidth: 1/PixelRatio.get(),
					borderColor: Colors.weakGrayColor
				}}
			>
				<View style={styles.container}>
					<CheckBox 
						ref={ref=>root._productCheckboxRef.push(ref)}
						defaultValue={false}
						style={{marginRight:10}}
						data={{count:count,price:data.price}}
						checkEvent={this._checkEvent}
						unCheckEvent={this._unCheckEvent}
					/>
					<Image
						source={{uri:data.coverIcon}}
						style={{
							width: 56,
							height: 56
						}}
					/>
					<View style={styles.rightContainer}>
						<Text style={styles.titleText}>{data.title}</Text>
						<View style={styles.attrAndStockContainer}>
							<Text style={[styles.attrAndStockText]} numberOfLines={1}>{this._getAttrText(data)}</Text>
							<Text style={styles.attrAndStockText}>库存:{data.stock}件</Text>
						</View>
						<View style={styles.priceContainer}>
							<Text style={styles.priceText}>¥: {Number(data.price/100).toFixed(2)}</Text>
							<View style={styles.actionContainer}>
								<TouchableOpacity onPress={this._minusCountNumber}>
									<View style={styles.actionBox}>
										<Text style={styles.actionText}>-</Text>
									</View>
								</TouchableOpacity>
								<View style={styles.actionBox}>
									<Text style={styles.numberText}>{rowData.count}</Text>
								</View>
								<TouchableOpacity onPress={this._addCountNumber}>
									<View style={styles.actionBox}>
										<Text style={styles.actionText}>+</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</SwipeOut>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
	},
	rightContainer: {
		flex: 1,
		marginLeft: 10
	},
	titleText: {
		fontSize: 12
	},
	attrAndStockContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 3
	},
	attrAndStockText: {
		fontSize: 12,
		color: '#8f8f8f',
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5
	},
	priceText: {
		fontSize: 12
	},
	actionContainer: {
		flexDirection: 'row'
	},
	actionBox: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor,
		width: 25,
		height: 25
	},
	actionText: {
		fontSize: 18
	},
	numberText: {
		fontSize: 14
	}
});