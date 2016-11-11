import React , { Component } from 'react';
import { View , Text , StyleSheet , Image , Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import U from '../../utils/util';
import CategoryRow from './category-row';
export default class Category extends Component {

	state = {
		cateData:[]
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		var parseUrl = U.serialize('category',{
			where:{"$and":[{"valid":true},{"recommend":true}]},
			order:'+seq',
			limit:999,
			skip:0
		});
		fetch(parseUrl,{
			headers: {
				'X-ML-APIKey':'NVNfYjdHZXQyRnpBS3NSUng0Mjd0dw',
				'X-ML-AppId':'577f745da5ff7f00013d608e'
			}
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				cateData:responseData.results
			});
		})
		.catch(error => {
	        Alert.alert(
	          'Error',
	          'There seems to be an issue connecting to the network.'
	        );
      	});
	}

	_renderCategory(){
		let element = [];
		const {cateData} = this.state;
		const pageNum = Math.ceil(cateData.length/10);
		for(let i=0;i<pageNum;i++){
			element.push(<CategoryRow key={'_category_row_'+i} data={cateData} pageIndex={i} />);	
		}
		return element;
	}

	render() {
		const {cateData} = this.state;
		if(cateData.length == 0){
			return null;
		}
		return (
			<View style={styles.cateContainer}>
				<Swiper 
					height={160} 
					showsPagination={false} 
					loop={false} 
					autoplay={false} 
				>
					{this._renderCategory()}
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cateContainer: {
		backgroundColor: '#FFF',
		marginBottom: 10,
		overflow: 'hidden'
	}
});