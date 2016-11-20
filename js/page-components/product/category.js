import React , { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryRow from './category-row';
import {loadCategory} from '../../actions';

export default class Category extends Component {
	
	state = {
		data: []
	}

	shouldComponentUpdate(nextProps, nextState) {
		return  this.state.data !== nextState.data;
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		loadCategory()
		.then(data=>{
			this.setState({
				data: data
			});
		})
	}

	_renderCategory = (): Array=> {
		let element = [];
		const {navigator} = this.props,
		{data} = this.state;
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
		const {data} = this.state;
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