import React , { Component } from 'react';
import { ListView , View , Text , Image , StyleSheet , TouchableHighlight , Alert } from 'react-native';
import U from '../../utils/util';

export default class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			productData: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		let parseUrl = U.serialize('products/client',{
			limit:10,
			skip:0,
			where:'{"valid":true,"obvious":true}',
			order:'obviousSeq,-onlineTime'
		});
		fetch(parseUrl,{
			headers: {
				'X-ML-APIKey':'NVNfYjdHZXQyRnpBS3NSUng0Mjd0dw',
				'X-ML-AppId':'577f745da5ff7f00013d608e'
			}
		})
		.then((response)=>response.json())
		.then((responseData)=> {
			this.setState({
				loaded: true,
				productData: this.state.productData.cloneWithRows(responseData.results)
			});
		})
		.catch(error => {
	        Alert.alert(
	          'Error',
	          'There seems to be an issue connecting to the network.'
	        );
      	});
	}

	fetchProductItemData = (productId) => {
		const {navigator,showIndicator,hideIndicator} = this.props;
		showIndicator();
		let parseUrl = U.serialize('products/'+productId);
		fetch(parseUrl,{
			headers: {
				'X-ML-APIKey':'NVNfYjdHZXQyRnpBS3NSUng0Mjd0dw',
				'X-ML-AppId':'577f745da5ff7f00013d608e'
			}
		})
		.then((response)=>response.json())
		.then((responseData)=>{
			navigator.push({
				title:'商品详情',
				name:'product-detail',
				params:{data:responseData}
			});
			hideIndicator();
		})
		.catch(error => {
	        Alert.alert(
	          'Error',
	          'There seems to be an issue connecting to the network.'
	        );
      	});
	}

	_renderRow = (rowData,sectionID,rowID) => {
		const {productData} = this.state;

		const style = rowID != productData._cachedRowCount - 1 ? styles.containerWithBottom : null;

		return 	(

					<TouchableHighlight onPress={() => {
						this.fetchProductItemData(rowData.id);
					}} underlayColor="#eee">
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

	render() {
		const {loaded,productData} = this.state;
		if(!loaded){
			return null;
		}
		return 	<ListView 
					dataSource={productData}
					renderRow={this._renderRow}
					style={{
						backgroundColor: '#FFF'
					}}
				/>
	}
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