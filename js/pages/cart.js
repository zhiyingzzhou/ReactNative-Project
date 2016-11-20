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
import {connect} from 'react-redux';
import {Page,BackNavBar} from '../components';
import {CartItem,CartTabbar,CartEmpty} from '../page-components/cart';
import {loadCartData,updateCartNumber,deleteProductFromCart,selectProduct} from '../actions';

class CartPage extends Component {

	state = {
		Animatedbottom: new Animated.Value(0),
		rightNavigatorText: '编辑',
	}
	
	static defaultProps = {
		data: [],
		loaded: false
	}

	//初始化请求数据索引为0
	start = 0;
	//打开的rowId
	openRowId='';
	//用来保存所有row实例
	_dataRow = [];
	//关闭row
	_closeRow = (): void=> {
		InteractionManager.runAfterInteractions(()=>{
			const {_dataRow,openRowId} = this;
			if(openRowId&&openRowId.length > 0){
				this._dataRow[openRowId]._close();
			}
		});
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

	componentDidMount() {
		InteractionManager.runAfterInteractions(()=>{
			this.fetchData();
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.dataBlob !== this.props.dataBlob || nextState !== this.state;
	}

	 fetchData = (): void=>{
		this.props.loadCartData(0);
	}

	_renderRow = (rowData: Object,sectionId: string,rowId: string) => {
		let id: string= '' + sectionId + rowId;
		return (
			<CartItem 
				{...this.props}
				index={rowId}
				data={rowData}
				rowId={id}
				root={this}
			/>
		);
	}

	_calcPriceAndCount = () => {
		let totalCount: number = 0,
		totalPrice: number = 0,
		{dataBlob=[]} = this.props,
		selectedProduct: Array<Object>= _.filter(dataBlob,{isSelected:1});
		return _.reduce(selectedProduct,(pre,cur)=>{
			const {count,price} = cur;
			return {price:pre.price+count*price,count:pre.count+count}
		},{price:0,count:0});
	}

	_calcIsSelectAll = (): boolean => {
		let {dataBlob} = this.props,
		isSelectAll = _.find(dataBlob,{isSelected:0});
		if(!isSelectAll){
			return true;
		}else{
			return false;
		}
	}

	_onPress = () =>{
		const {navigator} = this.props;
		navigator.pop();
	}

	render() {
		const {cartData,loaded,dataBlob} = this.props,
		totalPriceAndtotalCount: Object= this._calcPriceAndCount(),
		isSelectAll: boolean = this._calcIsSelectAll(),
		{Animatedbottom,rightNavigatorText} = this.state;
		onPressHandler = rightNavigatorText === '编辑' ? 
		this._editCart.bind(this,'完成',1) : 
		this._editCart.bind(this,'编辑',0);
		
		return (
			<Page>
				<BackNavBar 
					{...this.props} 
					rightButton={{title:rightNavigatorText,tintColor:'#FFF',onPress:onPressHandler}}
				/>
					{loaded&&dataBlob.length > 0 &&
						<ListView 
							dataSource={cartData}
							renderRow={this._renderRow}
							showsVerticalScrollIndicator={false}
							style={{
								marginBottom: 50
							}}
						/>
					}
				{loaded&&dataBlob.length > 0 &&
					<CartTabbar
						root={this}
						Animatedbottom={Animatedbottom}
						totalPriceAndtotalCount={totalPriceAndtotalCount}
						isSelectAll={isSelectAll}
						selectProduct={this.props.selectProduct}
					/>
				}
				{loaded&&dataBlob.length === 0 &&
					<CartEmpty onPress={this._onPress} />
				}
			</Page>
		);
	}
}

function mapStateToProps(state){
	return state.cart;
}
function mapDispatchToProps(dispatch){
	return {
		updateCartNumber: (arg) => dispatch(updateCartNumber(arg)),
		loadCartData: (start) => dispatch(loadCartData(start)),
		deleteProductFromCart: (arg) => dispatch(deleteProductFromCart(arg)),
		selectProduct: (data,isSelected) => dispatch(selectProduct(data,isSelected))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CartPage);