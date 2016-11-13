import React , { Component } from 'react';
import { View , Text , Image , Dimensions , StyleSheet , TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import U from '../../utils/util';

export default class ProductDetailhead extends Component {

	static defaultProps = {
		data: {
			pics:[],
		},
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data;
	}

	_renderPics(){
		const {data} = this.props;
		return  (
					<Swiper 
						autoplay={false}
						height={351}
						index={0}
						renderPagination={(index,total,context)=>{
							return 	(
										<View pointerEvents='none' style={styles.pagination}>
											<Text style={{color:'#FFF'}}>{index+1}/{total}</Text> 
										</View>
									)
						}}
					>
						{
							data.pics.map((item,index)=>{
								return 	(
											<Image 
												key = {'_pics_'+index}
												source={{uri:item}} 
												style={{
													height: 351
												}}
											/>
										)
							})
						}
					</Swiper>
				);
	}

	render() {
		const {data} = this.props;
		if(data.pics&&data.pics.length === 0 ){
			return null;
		}
		return 	(
					<View style={styles.container}>
						{this._renderPics()}
						<View style={{
							paddingHorizontal: 15,
							paddingVertical: 10
						}}>
							<Text style={styles.title}>
								{data.title}
							</Text>
							<Text style={[styles.description,styles.contentPaded]}>
								{data.description}
							</Text>
							<Text style={[styles.price,styles.contentPaded]}>
								¥{data.price / 100}
							</Text>
							<View style={[styles.bottomRow,styles.contentPaded]}>
								<Text style={[styles.bottomRowText,styles.originalPrice]}>¥{data.originalPrice/100}</Text>
								<View style={styles.bottomRowRightContainer}>
									<Text style={styles.bottomRowText}>库存:{data.stock}件</Text>
									<Text style={styles.bottomRowText}>销量:{data.saleCount}笔</Text>
								</View>
							</View>
						</View>
					</View>
				);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		
	},
	pagination: {
		position: 'absolute',
		bottom: 15,
		right: 15,
		paddingVertical: 2,
		paddingHorizontal: 8,					    
		borderRadius: 12,						    
		backgroundColor: '#c7c7cc'							    						   			    		
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	description: {
		fontSize: 14,
		color: '#c7c7cc'
	},
	price: {
		fontSize: 20,
		color: '#e74c3c'
	},
	originalPrice: {
		textDecorationLine: 'line-through'
	},
	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	bottomRowRightContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 5
	},
	bottomRowText: {
		fontSize: 12,
		color: '#c7c7cc'
	},
	contentPaded: {
		marginTop: 5
	}
});