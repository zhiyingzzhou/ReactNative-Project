import React , { Component , PropTypes } from 'react';
import { View , Text , Image , TouchableHighlight , StyleSheet } from 'react-native';
/*
	本组件接收五个props
	onRequestStart: 开始请求的时候
	onRequestEnd: 请求结束的时候
	navigator,
	data: 渲染的数据
	style: 外层view的style
	
*/
export default class ProductItem extends Component {

	static defaultProps = {
		data: null,
		style: []
	};

	static propTypes = {
		navigator: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	};

	_jumpToDetailPage = (): void=> {
		const {data,navigator} = this.props;
		navigator.push({
			title:'商品详情',
			name:'product-detail',
			params:{productId:data.id}
		});
	}

	render() {
		const {data,style} = this.props;
		if(!data){
			return null;
		}
		return (
			<TouchableHighlight onPress={this._jumpToDetailPage} underlayColor="#eee">
				<View style={[styles.container , style]}>
					<Image 
						source={{uri:data.coverIcon}}
						style={{
							width: 56,
							height: 56
						}}
					/>
					<View style={styles.rightContainer}>
						<Text numberOfLines={1}>{data.title || ''}</Text>
						<Text style={styles.saleText}>销量: {data.saleCount || 0}笔</Text>
						<View style={styles.bottomRow}>
							<Text style={styles.priceText}>¥{data.price/100 || 0}</Text>
							<View style={styles.bottomRowRight}>
								<Text style={[styles.bottomRowRightText,styles.originalPrice]}>¥{data.originalPrice/100 || 0}</Text>
								<Text style={styles.bottomRowRightText}>{data.commentNum || 0}人评价</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 8,
		alignItems: 'center',
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