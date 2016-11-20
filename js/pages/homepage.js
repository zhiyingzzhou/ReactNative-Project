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
import {loadList} from '../actions';

class HomePage extends Component {
	static defaultProps = {
		listData: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		listLoaded: false
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		this.props.loadList();
	}

	_onRefresh = () => {
	}

	render() {
		const {listData,listLoaded} = this.props;
		return (
			<Page>
				<NavBar 
					title={{title:this.props.title}}
				/>
				<ScrollViewWithRefreshControl
					refreshing={!listLoaded}
					onRefresh={this._onRefresh}
				>
					<Banner {...this.props} />
					<Category 
						{...this.props} 
					/>
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
    loadList: () => dispatch(loadList())
  };
}


export default connect(mapStateToProps,
  mapDispatchToProps)(HomePage);