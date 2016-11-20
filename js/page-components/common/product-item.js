import React , { Component , PropTypes } from 'react';
import { View , Text , Image , TouchableHighlight , StyleSheet } from 'react-native';
import {Colors} from '../../common';

//Tag component
class Tag extends Component {
	render() {
		return (
			<View style={{
				backgroundColor: Colors.themeColor,
				height: 20,
				marginRight: 3,
				paddingVertical: 2,
				paddingHorizontal: 8,
				borderRadius: 8,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: 3
			}}>
				<View style={{
					width: 5,
					height: 5,
					backgroundColor: '#FFF',
					borderRadius: 5,
					marginRight: 2
				}}>
				</View>
				<Text style={{
					color: '#FFF',
					fontSize: 12
				}}>
					{this.props.item}
				</Text>
			</View>
		);
	}
}

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

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

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

	_renderSubscript = (subscript: number): element => {
		//subscript: 1为热卖 2为抢购 3为推荐 4为特价 0为没有设置角标
		if(subscript === 0){
			return null;
		}
		let subscriptSource = null;
		switch(subscript) {
			case 1: 
				subscriptSource = require('../../image/hot.png');
				break;
			case 2:
				subscriptSource = require('../../image/snapup.png');
				break;
			case 3:
				subscriptSource = require('../../image/recommend.png');
				break;
			case 4:
				subscriptSource = require('../../image/special.png');
				break;
		}

		return <Image 
					source={subscriptSource}
					style={{
						width: 32,
						height: 32,
						position: 'absolute',
						resizeMode: 'contain',
						top:0,
						left: 0
					}}
				/>;
	}

	_renderTags = (tags: Array): element=> {
		if(tags.length === 0){
			return null
		}
		let Element = [];
		tags.forEach((item: string,index)=>{
			Element.push(<Tag key={'_tags_'+index} item={item} />); 
		});
		return (
			<View style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				marginTop: 5
			}}>
				{Element}
			</View>
		);
	}

	render() {
		const {data,style} = this.props;
		if(!data){
			return null;
		}
		return (
			<TouchableHighlight onPress={this._jumpToDetailPage} underlayColor="#eee">
				<View style={[styles.container , style]}>
					<View>
						<Image 
							source={{uri:data.coverIcon}}
							style={{
								width: 56,
								height: 56
							}}
						/>
						{this._renderSubscript(data.subscript)}
					</View>
					<View style={styles.rightContainer}>
						<Text numberOfLines={1}>{data.title || ''}</Text>
						{this._renderTags(data.tags)}
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
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: '#FFF'
	},
	rightContainer: {
		flex: 1,
		paddingLeft: 10,
		flexDirection: 'column',
	},
	saleText: {
		fontSize: 12,
		color: '#c7c7cc',
		marginBottom: 5,
		marginTop: 2
	},
	priceText: {
		color: '#e74c3c',
		fontSize: 15,
	},
	bottomRow: {
		flexDirection: 'row',
	},	bottomRowRight: {
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