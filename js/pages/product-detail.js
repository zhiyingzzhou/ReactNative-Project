import React , { Component } from 'react';
import {View , ScrollView} from 'react-native';
import U from '../utils/util';
import {Page,BackNavBar} from '../components';
import {ProductDetailHead,ProductDetailList} from '../page-components/product-detail';

export default class ProductDetailpage extends Component {
	
	render() {
		const {title,navigator,params} = this.props;
		return (
			<Page>
				<BackNavBar navigator={navigator} title={title} />
				<ScrollView>
					<ProductDetailHead data={params.data} />
					<ProductDetailList data={params.data} navigator={navigator} />
				</ScrollView>
			</Page>
		);
	}
}