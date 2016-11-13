import React , { Component } from 'react';
import { 
	View , 
	ScrollView,
	InteractionManager,
	Animated
} from 'react-native';
import {Page,BackNavBar,ScrollViewWithRefreshControl} from '../components';
import {
	ProductDetailHead,
	ProductDetailList,
	ProductDetailTarbar,
	ProductDetailParams
} from '../page-components/product-detail';
import U from '../utils/util';
export default class ProductDetailpage extends Component {

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
		InteractionManager.runAfterInteractions(()=>{
			this.fetchData();
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

	_setProductAttr = (visibleType) => {
		InteractionManager.runAfterInteractions(()=>{
			this.setState({
				modalVisible:visibleType
			});
		});
		InteractionManager.runAfterInteractions(()=>{
			Animated.timing(this.state.top,{
				toValue: Number(visibleType),
				duration: 200
			}).start();
		});
	}

	render() {
		const {data,refreshing,top,modalVisible} = this.state;
		const keyLength = data ? Object.getOwnPropertyNames(data).length : 0;
		return (
			<Page>
				<BackNavBar {...this.props} />
				<ScrollViewWithRefreshControl 
					refreshing={refreshing}
					onRefresh={this._onRefresh}
				>
					{keyLength > 0 && 
						<ProductDetailHead data={data} />
					}
					{keyLength > 0 && 
						<ProductDetailList 
							data={data} 
							{...this.props}  
							showModal={this._setProductAttr.bind(this,true)}
						/>
					}
				</ScrollViewWithRefreshControl>
				{keyLength > 0 && 
					<ProductDetailTarbar 
						data={data} 
						{...this.props} 
						showModal={this._setProductAttr.bind(this,true)}
					/>
				}
				<ProductDetailParams 
					data={data}
					top={top}
					modalVisible={modalVisible}
					hideModal={this._setProductAttr.bind(this,false)} 
				/>
			</Page>
		);
	}
}