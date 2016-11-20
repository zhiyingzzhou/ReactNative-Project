import React , { Component } from 'react';
import { 
	View , 
	Text , 
	Image ,
	ListView , 
	StyleSheet,
	InteractionManager , PixelRatio , RefreshControl , TouchableOpacity } from 'react-native';
import {
	Page,
	BackNavBar} from '../components';
import BasePage from './base-page';
import {CategoryTab} from '../page-components/product-category';
import ProductItem from '../page-components/common/product-item';
import ProductGridItem from '../page-components/common/product-grid-item';
import {getCategoryProductData} from '../actions';
import Icomoon from '../common/font/fonts.js';
import _ from 'lodash';
import {Colors} from '../common'

export default class ProductCategoryPage extends BasePage {
	constructor(props) {
	  super(props);
	}

	//缓存列表形式数据
	cachedListData = [];
	//缓存表格形式的数据
	cachedGridData = [];

	state = {
		...this.state,
		tabs:[
			{name:'上架时间',active:true,order:0,field:'onlineTime'},
			{name:'价格',active:false,order:0,field:'price'},
			{name:'销量',active:false,order:0,field:'saleCount'}
		],
		item:{name:'上架时间',active:true,order:0,field:'onlineTime'},
		loaded: false,
		loadNextEnd: true,
		data: new ListView.DataSource({
					rowHasChanged:(r1,r2)=> r1 !== r2 
				}),
		showList: true
		
	};
	componentDidMount() {
		InteractionManager.runAfterInteractions(()=>{
			this.getInitialPageConfit();
			this.fetchData(this.state.item);
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}
	fetchData = (item,pageConfig={skip:0}) => {
		if(pageConfig.skip === 0){
			//将page重置为1
			this.setState({
				page: 1
			});
		}
		const {params} = this.props,
		{skip} = pageConfig;
		//请求数据
		getCategoryProductData(params.categoryId,item,skip)
		.then(data=>{
			//缓存数据
			this.cachedGridData = this.cachedGridData.concat(_.chunk(data.results,2));
			this.cachedListData = this.cachedListData.concat(data.results);
			setTimeout(()=>{
				this.setState({
					dataCount: data.count,
					data:this.state.data.cloneWithRows(this.state.showList ? this.cachedListData : this.cachedGridData),
					item: item
				});
				if(skip > 0){
					this.setState({
						loadNextEnd: true
					});
				}else{
					this.setState({
						loaded: true
					});
				}
			},500);
		},(err)=>{
			this.setState({
				loaded:true,
				loadNextEnd:true
			});
		});
	}

	_onEndReached = () => {
		const {dataCount,page} = this.state;
		//page页面小于等于总的page页面
		if(Math.ceil(dataCount/10)>=page&&this.state.loadNextEnd){
			this.fetchData(
				this.state.item,
				this.getLoadNextPageConfig()
			);
		}
	}

	_onRefresh = () => {
		this.cachedListData = [];
		this.cachedGridData = [];
		this.getInitialPageConfit();
		this.fetchData(this.state.item);
	}

	_changeCategoryTab = (item) => {
		_listView.scrollTo({y:0,animted:false});
		this.cachedListData = [];
		this.cachedGridData = [];
		this.getInitialPageConfit();
		this.fetchData(item);
	}

	_renderRow = (rowData: Object,sectionID: string,rowID: string) => {
		const {data,showList} = this.state;
		{/*如果为列表中的最后一行,不添加bottom-border*/}
		const style: Object= rowID != data._cachedRowCount - 1 ? styles.containerWithBottom : null;
		if(showList){
			return <ProductItem 
					data={rowData}
					style={style}
					{...this.props}
				/>
		}
		return (
				<ProductGridItem 
					data={rowData}
					style={style}
				/>
		);
	}

	_renderFooter = () => {
		//渲染下拉刷新加载指示符
		if(this.state.loadNextEnd){
			return null;
		}
		return (
			<View style={styles.refresh}>
				<Image 
					source={require('../image/refreshing.gif')}
					style={{
						width: 20,
						height: 20
					}}
				/>
				<Text style={{
					marginLeft: 3,
					fontSize: 12
				}}>正在加载...</Text>
			</View>
		);
	}

	_changeShowWay = () =>{
		InteractionManager.runAfterInteractions(()=>{
			this.setState({
				showList: !this.state.showList,
				data: this.state.data.cloneWithRows(!this.state.showList ? this.cachedListData : this.cachedGridData)
			});
		});
	}

	render() {
		const {tabs,data,loaded,loadNextEnd,showList} = this.state;
		return (
			<Page>
				<BackNavBar 
					{...this.props} 
					rightButton={
						<TouchableOpacity onPress={this._changeShowWay}>
							{showList ? 
								<Icomoon 
									name="grid"
									size={17}
									color="#FFF"
								/>
								:
								<Icomoon 
									name="list"
									size={22}
									color="#FFF"
								/>
							}
						</TouchableOpacity>
					}
				/>
				<CategoryTab 
					tabs={tabs}
					subscribeEvent={this._changeCategoryTab} 
				/>
				<ListView 
					ref={ref=>_listView=ref}
					dataSource={data}
					renderRow={this._renderRow}
					style={[styles.listview]}
					enableEmptySections={true}
					onEndReached={this._onEndReached}
					onEndReachedThreshold={0}
					removeClippedSubviews={true }
					renderFooter={this._renderFooter}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl 
							onRefresh={this._onRefresh}
							refreshing={!loaded}  
							colors={Colors.progressColors} 
							progressBackgroundColor={Colors.progressBackgroundColor}
						/>
					}
				/>
				{loaded&&data._cachedRowCount === 0 &&
					<View style={styles.emtpyData}>
						<Text style={styles.emptyText}>暂无数据</Text>
					</View>
				}
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	listview: {
		backgroundColor: Colors.pageBgColor,
		marginTop: 10,
	},
	containerWithBottom: {
		borderBottomWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor,
		borderStyle: 'solid'
	},
	emtpyData: {
		position: 'absolute',
		top: 98,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 15
	},
	refresh: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5
	}
});