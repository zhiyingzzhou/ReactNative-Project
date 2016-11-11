import React , { Component , PropTypes } from 'react';
import { View , Text , WebView } from 'react-native';
import {Page,BackNavBar} from '../components';
 
export default class ProductDetailTest extends Component {
	render() {
		const {params} = this.props;
		const data = params.detailHTML === '' ? `<p style="text-align:center;">无数据</p>` : params.detailHTML;
		return 	(
					<Page>
						<BackNavBar {...this.props} />
						<WebView 
							source={{html:data}}
							scalesPageToFit={true}
						/>
					</Page>
				);
	}
}