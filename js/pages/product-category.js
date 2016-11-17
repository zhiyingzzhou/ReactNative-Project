import React , { Component } from 'react';
import { 
	View , 
	Text , 
	ListView , 
	StyleSheet,
	InteractionManager , PixelRatio } from 'react-native';
import {
	Page,
	BackNavBar,
	ScrollViewWithRefreshControl} from '../components';

import {CategoryTab} from '../page-components/product-category';
import ProductItem from '../page-components/common/product-item';

import U from '../utils/util';

import {Colors} from '../common'

export default class ProductCategoryPage extends Component {
	state = {
		tabs:[
			{name:'上架时间',active:true,order:0,field:'onlineTime'},
			{name:'价格',active:false,order:0,field:'price'},
			{name:'销量',active:false,order:0,field:'saleCount'}
		],
		item:{name:'上架时间',active:true,order:0,field:'onlineTime'},
		isRefreshing: true,
		loaded: false,
		data: new ListView.DataSource({
					rowHasChanged:(r1,r2)=> r1 !== r2 
				})
	};
	componentDidMount() {
		InteractionManager.runAfterInteractions(()=>{
			this.fetchData(this.state.item);
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}
	fetchData = item => {
		this.setState({
			isRefreshing: true,
			loaded: false
		});
		const {params} = this.props,
		{order,field} = item,
		symbol = !!order ? '+' : '-',
		orderStr = symbol + field;
		U.get('category/'+params.categoryId+'/products',{
			limit: 10,
			skip: 0,
			where:'{"$and":[{"valid":true},{"expireTime":{"$gt":1478887859449}},{"onlineTime":{"$lt":1478887859449}}]}',
			order:orderStr
		},data=>{
			setTimeout(()=>{
				this.setState({
					data:this.state.data.cloneWithRows(data.results),
					item: item,
					isRefreshing:false,
					loaded: true
				});
			},500);
		},()=>{
			this.setState({
				isRefreshing:false
			});
		});
	}

	_onRefresh = () => {
		const {item} = this.state;
		this.fetchData(item);
	}

	_renderRow = (rowData: Object,sectionID: string,rowID: string) => {
		const {data} = this.state;
		{/*如果为列表中的最后一行,不添加bottom-border*/}
		const style: Object= rowID != data._cachedRowCount - 1 ? styles.containerWithBottom : null;
		return <ProductItem 
					data={rowData}
					style={style}
					{...this.props}
				/>
	}

	render() {
		const {tabs,data,isRefreshing,loaded} = this.state;
		return (
			<Page>
				<BackNavBar {...this.props} />
				<ScrollViewWithRefreshControl
					refreshing = {isRefreshing}
					onRefresh={this._onRefresh}
				>
					<CategoryTab 
						tabs={tabs}
						subscribeEvent={this.fetchData} 
					/>
					{(loaded&&!isRefreshing&&data._cachedRowCount === 0)
						?
						<View style={styles.emtpyData}>
							<Text style={styles.emptyText}>暂无数据</Text>
						</View>
						: 
						<ListView 
							dataSource={data}
							renderRow={this._renderRow}
							style={styles.listview}
							enableEmptySections={true}
						/>
					}
				</ScrollViewWithRefreshControl>
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	listview: {
		backgroundColor: '#FFF'
	},
	containerWithBottom: {
		borderBottomWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor,
		borderStyle: 'solid'
	},
	emtpyData: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 15
	}
});