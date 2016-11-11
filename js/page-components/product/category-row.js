import React , { Component } from 'react';
import { View , Text , StyleSheet , Image } from 'react-native';
import Swiper from 'react-native-swiper';
import U from '../../utils/util';

export default class CategoryRow extends Component {

	_renderCateRow(){
		let element = [];
		const {data,pageIndex} = this.props;
		const rowNum = Math.ceil(data.length/5);
		for(let i=0;i<rowNum;i++){
			let rowData = data.slice(pageIndex*10+i*5,pageIndex*10+i*5+5);
			element.push(
					rowData.map((item,index)=>{
						return 	<View key={'_categoryItem_'+index} style={[{
									width: U.getScreenWidth()/5
								},styles.cateItem]}>
									<Image
										source={{uri:item.icon}}
										style={{
											width: U.getScreenWidth()/5,
											height:45,
											resizeMode: 'contain'
										}}
								 	/>
									<Text style={{
										marginTop: 5
									}}>{item.name}</Text>
								</View>
					})
			)
		}
		return element;
	}

	render() {
		return (
				<View style={styles.cateRow}>
					{this._renderCateRow()}
				</View>
			);
	}
}

const styles = StyleSheet.create({
	cateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	cateItem: {
		alignItems: 'center',
		justifyContent:'center',
		height: 80
	}
});