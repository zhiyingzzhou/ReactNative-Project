import React , { Component } from 'react';
import {View,Text,Image,StyleSheet,PixelRatio} from 'react-native';
import {Colors} from '../../common';
import U from '../../utils/util';
const width = U.getScreenWidth();

export default class ProductGridItem extends Component {
	render() {
		const {data,style} = this.props;
		return (
			<View style={[styles.container,style]}>
				{
					data.map((item,index)=>{
						const borderRight = index === 0 ? styles.singleGridWithBorderRight : null;
						return (
							<View key={'_grid_item'+index} style={[styles.singleGrid,borderRight]}>
								<Image 
									source={{uri:item.coverIcon}}
									style={styles.image}
								/>
								<Text numberOfLines={2} style={[styles.title,{
									marginTop: 10
								}]}>{item.title || ''}</Text>
								<Text style={[styles.greyFont,{
									marginTop: 15
								}]}>销量: {item.saleCount || 0}笔</Text>
								<View style={styles.priceContainer}>
									<Text style={styles.price}>{Number(item.price/100).toFixed(2)}</Text>
									<Text style={styles.greyFont}>{item.commentNum || 0}人评价</Text>
								</View>
								<Text style={[styles.greyFont,{
									textDecorationLine: 'line-through'
								}]}>
									{Number(item.originalPrice/100).toFixed(2) || Number(0).toFixed(2)}
								</Text>
							</View>
						);
					})
				}
				
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFF'
	},
	singleGrid: {
		paddingHorizontal: 15,
		width: width / 2,
		backgroundColor: '#FFF',
		paddingVertical: 9
	},
	singleGridWithBorderRight: {
		borderRightWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor
	},
	image: {
		width: width/2 - 30,
		height: 150,
	},
	title: {
		fontSize: 13
	},
	greyFont: {
		fontSize: 12,
		color: '#c7c7cc'
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	price: {
		fontSize: 15,
		color: Colors.highlightColor
	},
});