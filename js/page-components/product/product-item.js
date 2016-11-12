import React , { Component } from 'react';
import {View , Text , Image , TouchableHighlight , StyleSheet} from 'react-native';
import U from '../../utils/util';

function fetchProductItemData(productId: number){
	const {navigator,showIndicator,hideIndicator} = this.props;
	if(showIndicator){
		showIndicator();
	}
	U.get('products/'+productId,data=>{
		navigator.push({
			title:'商品详情',
			name:'product-detail',
			params:{data:data}
		});
		if(hideIndicator){
			hideIndicator();
		}
	});
}

module.exports = function(rowData: Object,sectionID: number,rowID: number){
	const {data} = this.state;
	const style = rowID != data._cachedRowCount - 1 ? styles.containerWithBottom : null;
	return (
		<TouchableHighlight onPress={fetchProductItemData.bind(this,rowData.id)} underlayColor="#eee">
			<View style={[styles.container , style]}>
				<Image 
					source={{uri:rowData.coverIcon}}
					style={{
						width: 56,
						height: 56
					}}
				/>
				<View style={styles.rightContainer}>
					<Text numberOfLines={1}>{rowData.title}</Text>
					<Text style={styles.saleText}>销量: {rowData.saleCount}笔</Text>
					<View style={styles.bottomRow}>
						<Text style={styles.priceText}>¥{rowData.price/100}</Text>
						<View style={styles.bottomRowRight}>
							<Text style={[styles.bottomRowRightText,styles.originalPrice]}>¥{rowData.originalPrice/100}</Text>
							<Text style={styles.bottomRowRightText}>{rowData.commentNum}人评价</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 8,
		alignItems: 'center',
	},
	containerWithBottom: {
		borderBottomWidth: 0.5,
		borderColor: '#ccc',
		borderStyle: 'solid'
	},
	rightContainer: {
		flex: 1,
		paddingLeft: 10,
		flexDirection: 'column',
	},
	saleText: {
		fontSize: 12,
		color: '#c7c7cc',
		marginVertical: 5
	},
	priceText: {
		color: '#e74c3c',
		fontSize: 15,
	},
	bottomRow: {
		flexDirection: 'row',
	},
	bottomRowRight: {
		flex: 1,
		flexDirection: 'row',								
		justifyContent: 'space-between',								
		alignItems: 'center',	
		paddingLeft: 5,							
	},
	bottomRowRightText: {
		fontSize: 12,
		color: '#c7c7cc'										
	},
	originalPrice: {
		textDecorationLine: 'line-through'
	}
});