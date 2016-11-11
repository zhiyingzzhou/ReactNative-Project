import React , { Component } from 'react';
import { Navigator } from 'react-native';

import HomePage from './pages/homepage';
import ProductDetailPage from './pages/product-detail';
import ProductWebViewPage from './pages/product-detail-webview';

export default class SetUp extends Component {
	initialRoute = {
		title: '商城',
		name: 'homepage'
	}

	_routeMapper = (route , navigationOperation) => {
		let Component;
		switch(route.name){
			case 'homepage':
				Component = HomePage;
				break;
			case 'product-detail':
				Component = ProductDetailPage;
				break;
			case 'product-detail-webview':
				Component = ProductWebViewPage;
				break;
		}
		return <Component 
					title={route.title} 
					params={route.params || {}} 
					navigator={navigationOperation} 
				/>
	}
	render() {
		return (
			<Navigator 
				initialRoute = {this.initialRoute}
				configureScene = {(route)=>{
					return Navigator.SceneConfigs.PushFromRight;
				}}
				renderScene = {this._routeMapper}
			/>
		)
	}
}