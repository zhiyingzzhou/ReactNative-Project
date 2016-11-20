import React , { Component } from 'react';
import {View,Image,TouchableWithoutFeedback} from 'react-native';
import Swiper from 'react-native-swiper';
import {loadBanner} from '../../actions';

export default class Banner extends Component {

	state = {
		data: [],
		loaded: false
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		loadBanner()
		.then(data=>{
			this.setState({
				data: data,
				loaded: true
			});
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.data !== this.state.data;
	}

	_jumpToDetailPage = (item: Object): void=> {
		const {navigator} = this.props;
		//如果有allCategory属性,跳转到category页面,否则跳转到商品详情页面
		if(item.hasOwnProperty('allCategory')){
			navigator.push({
				title: item.name,
				name: 'product-category',
				params: {categoryId: item.id}
			});
		}else{
			navigator.push({
				title:'商品详情',
				name:'product-detail',
				params:{productId:item.id}
			});
		}
	}

	render() {
		const {data} = this.state;
		if(data.length === 0){
			return null;
		}
		return (
			<Swiper
				height={140}
				paginationStyle={{
					justifyContent: 'flex-end',
					marginHorizontal:10,
					bottom: 10
				}}
				loop={true}
				autoplay={true}
				autoplayTimeout={5}
			>
				{
					data.map((item: Object,index)=>{
						return (
								<TouchableWithoutFeedback
									key={'_banner_'+index}
									onPress={this._jumpToDetailPage.bind(this,item)}
								>
									<View>
										<Image 
											source={{uri:item.bannerIcon}}
											style={{height:140}}
										/>
									</View>
								</TouchableWithoutFeedback>
							)
					})
				}
			</Swiper>
		);
	}
}