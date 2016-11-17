import React , { Component } from 'react';
import { 
	View , 
	ScrollView,
	InteractionManager,
	Animated
} from 'react-native';
import {Page,BackNavBar,ScrollViewWithRefreshControl,Mask} from '../components';
import {
	ProductDetailHead,
	ProductDetailList,
	ProductDetailTarbar,
	ProductDetailAttr
} from '../page-components/product-detail';
import {connect} from 'react-redux';
import U from '../utils/util';
import {loadCartNumber,addProductToCart} from '../actions';

class ProductDetailpage extends Component {
	state = {
		modalVisible: false,
		data: {},
		refreshing: true,
		top: new Animated.Value(0)
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	componentDidMount() {
		const {loadCartNumber,cartNumber} = this.props;
		//获取数据
		InteractionManager.runAfterInteractions(()=>{
			this.fetchData();
			//获取购物车数量
			if(!cartNumber){
				loadCartNumber();
			}
		});
	}

	fetchData = () => {
		const {params} = this.props;
		U.get('products/'+params.productId,data=>{
			this.setState({
				data: data,
				refreshing: false
			});
		});
	}

	_onRefresh = () => {
		this.setState({
			refreshing: true,
		});
		this.fetchData();
	}

	_showProductAttr = (visibleType) => {
		InteractionManager.runAfterInteractions(()=>{
			Animated.timing(this.state.top,{
				toValue: 1,
				duration: 500
			}).start();
		});
		InteractionManager.runAfterInteractions(()=>{
			this.setState({
				modalVisible:true
			});
		});
	}

	_hideProductAttr = () => {
		this.setState({
			modalVisible:false
		});
		InteractionManager.runAfterInteractions(()=>{
			Animated.timing(this.state.top,{
				toValue: 0,
				duration: 300
			}).start();
		});
	}

	render() {
		const {data,refreshing,modalVisible} = this.state;
		const dataKeyLength = data ? Object.getOwnPropertyNames(data).length : 0;
		return (
			<Page>
				<BackNavBar {...this.props} />
				<ScrollViewWithRefreshControl 
					refreshing={refreshing}
					onRefresh={this._onRefresh}
				>
					{dataKeyLength > 0 && 
						<ProductDetailHead data={data} />
					}
					{dataKeyLength > 0 && 
						<ProductDetailList 
							{...this.props} 
							data={data} 
							showModal={this._showProductAttr.bind(this,true)}
						/>
					}
				</ScrollViewWithRefreshControl>
				{dataKeyLength > 0 && 
					<ProductDetailTarbar 
						{...this.props} 
						data={data} 
						showModal={this._showProductAttr.bind(this,true)}
					/>
				}
				<Mask visible={modalVisible} />
				<ProductDetailAttr 
					{...this.state}
					hideModal={this._hideProductAttr.bind(this,false)} 
					{...this.props}
				/>
			</Page>
		);
	}
}

function mapStateToProps(state){
	return state.cart;
}

function mapDispatchToProps(dispatch){
	return {
		loadCartNumber: () => dispatch(loadCartNumber()),
		addProductToCart: data => dispatch(addProductToCart(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailpage);