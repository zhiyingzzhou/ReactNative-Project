import React , { Component } from 'react';
import {View,Image,TouchableWithoutFeedback} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Banner extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data;
	}

	_jumpToDetailPage = productId => {
		const {navigator} = this.props;
		navigator.push({
			title:'商品详情',
			name:'product-detail',
			params:{productId:productId}
		});
	}

	render() {
		const {data} = this.props;
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
					data.map((item,index)=>{
						return (
								<TouchableWithoutFeedback
									key={'_banner_'+index}
									onPress={this._jumpToDetailPage.bind(this,item.id)}
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