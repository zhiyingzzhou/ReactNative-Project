import React , { Component } from 'react';
import { 
	View ,
	ListView } from 'react-native';
import _ from 'lodash';
import {
	NavBar,
	Page,
	ScrollViewWithRefreshControl,
	ActivityIndicator} from '../components';
import {
	Banner , 
	Category , 
	ProductList} from '../page-components/product';
import U from '../utils/util';
import SplashScreen from 'react-native-splash-screen'
export default class HomePage extends Component {
	state = {
		animating: false,
		bannerData: [],
		categoryData: [],
		listData: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		bannerLoaded: false,
		categoryLoaded: false,
		listLoaded: false
	}

	constructor(props) {
	  	super(props);
		this.getBannerData=getData.getBannerData.bind(this);
		this.getCategoryData=getData.getCategoryData.bind(this);
		this.getListData=getData.getListData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		this.getBannerData();
		this.getCategoryData();
		this.getListData();
	}

	_setIndicatorVisible = visibleType => {
		this.setState({
			animating:visibleType
		});
	}

	_onRefresh = () => {
		this.setState({
			bannerLoaded:false,
			categoryLoaded:false,
			listLoaded:false
		});
		this.fetchData();
	}
	render() {
		const {animating,bannerData,categoryData,
			listData,bannerLoaded,categoryLoaded,listLoaded} = this.state;
		return (
			<Page>
				<NavBar 
					title={{title:this.props.title}}
				/>
				<ScrollViewWithRefreshControl
					refreshing={!bannerLoaded&&!categoryLoaded&&!listLoaded}
					onRefresh={this._onRefresh}
				>
					<Banner 
						{...this.props}
						onRequestStart={this._setIndicatorVisible.bind(this,true)}
						onRequestEnd={this._setIndicatorVisible.bind(this,false)}
						data={bannerData} 
					/>
					<Category 
						{...this.props} 
						data={categoryData}
					/>
					<ProductList 
						{...this.props}
						data={listData}
						onRequestStart={this._setIndicatorVisible.bind(this,true)}
						onRequestEnd={this._setIndicatorVisible.bind(this,false)}
					/>
				</ScrollViewWithRefreshControl>
				{animating&&
					<ActivityIndicator animating={animating} />
				}
			</Page>
		);
	}
}

const getData = {
	getBannerData() {
		U.get('products/category/client',{
				limit: 5,
				where:'{"$and":[{"valid":true},{"banner":true}]}',
				order: '+priorityBanner'
		},data=>{
			let bannerData = [];
			_.map(data,(item,index)=>{
				bannerData = bannerData.concat(item.results);
			});
			this.setState({
				bannerData:bannerData,
				bannerLoaded:true
			});
		},()=>{
			this.setState({
				bannerLoaded:true
			});
		});
	},
	getCategoryData() {
		U.get('category',{
			where:'{"$and":[{"valid":true},{"recommend":true}]}',
			order:'+seq',
			limit:999,
			skip:0
		},data=>{
			this.setState({
				categoryData:data.results,
				categoryLoaded: true
			});
		},()=>{
			this.setState({
				categoryLoaded:true
			});
		});
	},
	getListData() {
		U.get('products/client',{
			limit:10,
			skip:0,
			where:'{"valid":true,"obvious":true}',
			order:'obviousSeq,-onlineTime'
		},data=>{
			this.setState({
				listData: this.state.listData.cloneWithRows(data.results),
				listLoaded: true
			});
		},()=>{
			this.setState({
				listLoaded:true
			});
		});
	}
}