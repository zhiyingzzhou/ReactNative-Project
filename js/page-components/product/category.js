import React , { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryRow from './category-row';

export default class Category extends Component {
	
	shouldComponentUpdate(nextProps, nextState) {
		return  this.props.data !== nextProps.data;
	}

	_renderCategory = () => {
		let element = [];
		const {navigator,data} = this.props;
		const pageNum = Math.ceil(data.length/10);
		for(let i=0;i<pageNum;i++){
			element.push(
				<CategoryRow 
					key={'_category_row_'+i} 
					data={data} 
					pageIndex={i} 
					navigator={navigator}
				/>
			);	
		}
		return element;
	}

	render() {
		const {data} = this.props;
		if(data.length === 0){
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