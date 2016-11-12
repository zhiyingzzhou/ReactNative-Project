import React , { Component } from 'react';
import { 
	View , 
	ScrollView
} from 'react-native';
import {Page,BackNavBar} from '../components';
import {
	ProductDetailHead,
	ProductDetailList,
	ProductDetailTarbar,
	ProductDetailParams
} from '../page-components/product-detail';
 
export default class ProductDetailpage extends Component {

	state = {
		modalVisible:false
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	_setModalVisible = (visibleType) => {
		this.setState({
			modalVisible: visibleType
		});
	}
	render() {
		const {title,navigator,params} = this.props;
		const {modalVisible} = this.state;
		return (
			<Page>
				<BackNavBar navigator={navigator} title={title} />
				<ScrollView>
					<ProductDetailHead data={params.data} />
					<ProductDetailList 
						data={params.data} 
						navigator={navigator} 
						showModal={this._setModalVisible.bind(this,true)}
					/>
				</ScrollView>
				<ProductDetailTarbar 
					data={params.data} 
					navigator={navigator} 
					showModal={this._setModalVisible.bind(this,true)}
				/>
				{modalVisible&&
					<ProductDetailParams 
						data={params.data}
						hideModal={this._setModalVisible.bind(this,false)} 
					/>
				}
			</Page>
		);
	}
}