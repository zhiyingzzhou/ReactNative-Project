import React , { Component } from 'react';
import { 
	View ,
	ListView } from 'react-native';
import {
	NavBar,
	Page,
	ScrollViewWithRefreshControl} from '../components';
import {
	Banner , 
	Category , 
	ProductList} from '../page-components/product';
import {connect} from 'react-redux';
import {loadBanner,loadCategory,loadList} from '../actions';

class HomePage extends Component {
	static defaultProps = {
		bannerData: [],
		categoryData: [],
		listData: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		bannerLoaded: false,
		categoryLoaded: false,
		listLoaded: false
	};

	componentDidMount() {
		this.props.loadBanner();
		this.props.loadCategory();
		this.props.loadList();
	}

	render() {
		const {bannerData,categoryData,listData,
			bannerLoaded,categoryLoaded,listLoaded} = this.props;
		return (
			<Page>
				<NavBar 
					title={{title:this.props.title}}
				/>
				<ScrollViewWithRefreshControl
					refreshing={!bannerLoaded&&!categoryLoaded&&!listLoaded}
					onRefresh={this._onRefresh}
				>
					{bannerData.length > 0 && 
						<Banner 
							{...this.props}
							data={bannerData} 
						/>
					}
					{categoryData.length > 0&&
						<Category 
							{...this.props} 
							data={categoryData}
						/>
					}
					{listData._cachedRowCount > 0 &&
						<ProductList 
							{...this.props}
							data={listData}
						/>
					}
				</ScrollViewWithRefreshControl>
			</Page>
		);
	}
}

function mapStateToProps(state) {
  return state.product;
}

function mapDispatchToProps(dispatch) {
  return {
    loadBanner: () => dispatch(loadBanner()),
    loadCategory: () => dispatch(loadCategory()),
    loadList: () => dispatch(loadList())
  };
}


export default connect(mapStateToProps,
  mapDispatchToProps)(HomePage);