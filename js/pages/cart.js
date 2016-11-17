import React , { Component } from 'react';
import {View,
	Text,
	ScrollView,
	ListView,
	InteractionManager,
	PanResponder,
	ToastAndroid,
	Animated
} from 'react-native';
import _ from 'lodash';
import {Page,BackNavBar} from '../components';
import {CartItem,CartTabbar} from '../page-components/cart';
import {getBatchCartDataWithIds} from '../actions';

export default class CartPage extends Component {

	state = {
		initialData: [],
		cartData: new ListView.DataSource({
			rowHasChanged: (row1,row2) => row1 !== row2
		}),
		Animatedbottom: new Animated.Value(0),
		rightNavigatorText: '编辑',
		totalPriceAndtotalCount: {
			price: 0,
			count: 0
		}
	}

	_productCheckboxRef = [];
	_tarbarCheckboxRef = null;

	//保存选中商品的总数
	totalCount = 0;
	//保存选中商品的总价
	totalPrice = 0;

	//在内存中保存用户选中的商品
	saveData = [];
	//初始化请求数据索引为0
	start = 0;
	//打开的rowId
	openRowId='';
	//用来保存所有row实例
	_dataRow = [];
	//关闭row
	_closeRow = (): void=> {
		const {_dataRow,openRowId} = this;
		if(openRowId&&openRowId.length > 0){
			this._dataRow[openRowId]._close();
		}
	}

	_editCart = (title: string,value: number): void=> {
		this._closeRow();
		this.setState({
			rightNavigatorText: title
		});
		//显示操作按钮
		InteractionManager.runAfterInteractions(()=>{
			Animated.timing(this.state.Animatedbottom,{
				toValue: value,
				duration: 300
			}).start();
		});
	}

	_generateIds(start: number): Array {
		const {cartNumber} = this.props.params,
		end: number = start + 10 >= cartNumber ? start + cartNumber%10 : start + 10;
		let ids = [];
		for(var i=start;i<end;i++){
			ids.push(i);
		}
		return ids;
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = (): void=>{
		InteractionManager.runAfterInteractions(()=>{
			getBatchCartDataWithIds(this._generateIds(this.start))
			.then((data: Array): void=>{
				data.forEach(item=>item.isSelected = false);
				const concatData = this.state.initialData.concat(data);
				this.setState({
					initialData: concatData,
					cartData: this.state.cartData.cloneWithRows(concatData)
				});
			},err=>{
				if(err.name === 'NotFoundError'){
					ToastAndroid.show('没有更多数据了!',ToastAndroid.SHORT);
				}
			})
		});
	}

	_onEndReached = (): void=> {
		this.start += 10;
		this.fetchData();
	}

	_triggerPriceAndCount = (): void=> {
		this.setState({
			totalPriceAndtotalCount:{
				price: this.totalPrice,
				count: this.totalCount
			}
		});
	}

	_listenerCheckBoxState = (isSelected: bool): void=> {
		const {_tarbarCheckboxRef,_productCheckboxRef} = this;
		if(_tarbarCheckboxRef.state.value && !isSelected){
			_tarbarCheckboxRef._setCheckBoxDrak();
		}
		if(!_tarbarCheckboxRef.state.value&&isSelected){
			let noSelectCheckBoxNumber = 0;
			_productCheckboxRef.forEach(item=>{
				if(item.state.value === false){
					noSelectCheckBoxNumber ++;
				}
			});
			if(noSelectCheckBoxNumber-1 === 0){
				_tarbarCheckboxRef._setCheckBoxHighlight();
			}
		}
	}

	_AddPriceAndCount = (data: Object): void=> {
		this.totalPrice += data.price;
		this.totalCount += data.count;
		this._triggerPriceAndCount();
	}

	_minusPriceAndCount = (data: Object): void=> {
		this.totalPrice -= data.price;
		this.totalCount -= data.count;
		this._triggerPriceAndCount();
	}

	_renderRow = (rowData: Object,sectionId: string,rowId: string) => {
		let id: string= '' + sectionId + rowId;
		return (
			<CartItem 
				rowData={rowData}
				rowId={id}
				root={this} 
			/>
		);
	}

	render() {
		const {cartData,Animatedbottom,rightNavigatorText,totalPriceAndtotalCount} = this.state,
		onPressHandler = rightNavigatorText === '编辑' ? 
		this._editCart.bind(this,'完成',1) : 
		this._editCart.bind(this,'编辑',0);
		return (
			<Page>
				<BackNavBar 
					{...this.props} 
					rightButton={{title:rightNavigatorText,tintColor:'#FFF',onPress:onPressHandler}}
				/>
					{cartData._cachedRowCount > 0 &&
						<ListView 
							dataSource={cartData}
							renderRow={this._renderRow}
							onEndReached={this._onEndReached}
							onEndReachedThreshold={0}
							style={{
								marginBottom: 50
							}}
						/>
					}
				<CartTabbar
					root={this}
					Animatedbottom={Animatedbottom}
					totalPriceAndtotalCount={totalPriceAndtotalCount}
				/>
			</Page>
		);
	}
}