import React , { Component } from 'react';
import {View,Image,Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import Util from '../../utils/util';
export default class Banner extends Component {
	state = {
		bannerData:[],
		loaded:false
	};

	componentDidMount() {
		this.fetchData();
	}

	serialize = (url,params) => {
		let arr = [];
		for(let i in params){
			arr.push(i+'='+encodeURIComponent(params[i]));
		}
		return url+'?'+arr.join('&');
	}

	fetchData() {
		const parseUrl = this.serialize('https://www.maxwon.cn/1.0/products/category/client',{
				limit: 5,
				where:'{"$and":[{"valid":true},{"banner":true}]}',
				order: '+priorityBanner'
			});
		fetch(parseUrl,{
			method: 'GET',
			headers: {
				'X-ML-AppId':'577f745da5ff7f00013d608e',
				'X-ML-APIKey':'NVNfYjdHZXQyRnpBS3NSUng0Mjd0dw'
			}
		})
		.then((response) => response.json())
		.then((responseData) => {
			let bannerData = [];
			_.map(responseData,(item,index)=>{
				bannerData = bannerData.concat(item.results);
			})
			this.setState({
				bannerData:bannerData,
				loaded:true
			});
		})
		.catch(error => {
	        Alert.alert(
	          'Error',
	          'There seems to be an issue connecting to the network.'
	        );
      	});
	}

	render() {
		const { loaded , bannerData } = this.state;
		if(!loaded){
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
					_.map(bannerData,(item,index)=>{
						return (
								<View key={'_banner_'+index}>
									<Image 
										source={{uri:item.bannerIcon}}
										style={{height:140}}
									/>
								</View>
							)
					})
				}
			</Swiper>
		);
	}
}