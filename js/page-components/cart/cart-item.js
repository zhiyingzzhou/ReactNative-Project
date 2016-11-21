import React , { Component } from 'react';
import {View,
	Text,
	Image,
	StyleSheet,
	Animated,
	PixelRatio,
	ToastAndroid,
	TouchableOpacity,
	InteractionManager} from 'react-native';
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
		data: {},
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data;
	}

	_rightButtonConfigure =(): Array =>{
		return [
			{
				text: '移到收藏',
				tintColor: '#FFF',
				style:{backgroundColor:'#7C7C7C'}, 
				onPress: () => {ToastAndroid.show('收藏成功',ToastAndroid.SHORT);this.props.root._closeRow()},
				underlayColor: '#FFF'
			},
			{
				text: '删除',
				tintColor: '#FFF',
				style:{backgroundColor:'rgb(239, 3, 28)'},
				onPress: () => this._deleteProductFromCart(),
				underlayColor: '#FFF'
			}
		]
	}

	_deleteProductFromCart = () => {
		const {deleteProductFromCart,data,root} = this._getVariables();
		root._closeRow();
		deleteProductFromCart(data);
	}

	_getAttrText = (data: Object): string=> {
		let attrText: string= '', 
		{customAttr,selectedAttrKeyArr} = data,
		customAttrArr: Array = customAttr && JSON.parse(customAttr),
		attrKeyArr = JSON.parse(selectedAttrKeyArr);
		if(attrKeyArr&&attrKeyArr.length>0){
			customAttrArr.forEach((item: attr,index)=>{
				item.val.forEach((val: val)=>{
					if(val.key === attrKeyArr[index]){
						attrText += item.text + ':' + val.val;
					}
				});
				if(index !== (customAttrArr.length - 1)){
					attrText += ',';
				}
			});
			return attrText.length > 16 ? attrText.substr(0,16)+'...' : attrText;
		}
		return '';
	}

	_getVariables() {
		const {data,root,index,deleteProductFromCart,updateCartNumber,selectProduct} = this.props;
		return {
			root: root,
			index: index,
			count: data.count,
			stock: data.stock,
			data: data,
			deleteProductFromCart: deleteProductFromCart,
			updateCartNumber: updateCartNumber,
			selectProduct: selectProduct
		}
	}

	_minusCountNumber = (): void => {
		const {root,index,count,updateCartNumber,data} = this._getVariables();
		//这里判断大于0,因为从props里有大于等于1的初始值
		if(count > 0){
			updateCartNumber(Object.assign({},data,{
				count: count - 2
			}));
		}
		root._closeRow();
	}

	_addCountNumber = () => {
		const {root,count,stock,updateCartNumber,data} = this._getVariables();
		if(count >= stock){
			ToastAndroid.show('购买数量不能超过库存!',ToastAndroid.SHORT);
			root._closeRow();
			return false;
		}
		root._closeRow();
		updateCartNumber(data);
	}

	_checkEvent = (): void => {
		const {selectProduct,data,root} = this._getVariables();
		root._closeRow();
		selectProduct(data,1);
	}

	_unCheckEvent = (): void=> {
		const {selectProduct,data,root} = this._getVariables();
		root._closeRow();
		selectProduct(data,0);
	}

	render() {
		const {count,data,root} = this._getVariables(),
		{rowId} = this.props;
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
						value={Boolean(data.isSelected)}
						style={{marginRight:10}}
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
									<Text style={styles.numberText}>
										{count}
									</Text>
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