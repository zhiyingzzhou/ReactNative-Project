import React , { Component } from 'react';
import {Navigator,BackAndroid,InteractionManager,ToastAndroid} from 'react-native';

import HomePage from './pages/homepage';
import ProductDetailPage from './pages/product-detail';
import ProductWebViewPage from './pages/product-detail-webview';
import ProductCategoryPage from './pages/product-category';
import CartPage from './pages/cart';

export default class AppNavigator extends Component {

	state = {
		initialRoute:{
			title: '商城',
			name: 'homepage'
		}
	};

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
	}

 	componentWillUnmount() {
    	BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  	}

  	handleBackButton = (): bool => {
  		const {navigator} = this.refs;
	    if (navigator && navigator.getCurrentRoutes().length > 1) {
	    	InteractionManager.runAfterInteractions(()=>{
	    		navigator.pop();
	    	});
	      	return true;
	    }
	    if(navigator && navigator.getCurrentRoutes().length == 1){
	    	if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
		      //最近2秒内按过back键，可以退出应用。
		      return false;
		    }
		    this.lastBackPressed = Date.now();
		    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
		    return true;
	    }
  	}

	_routeMapper = (route: Object, navigationOperation: Object): element=> {
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
			case 'product-category':
				Component = ProductCategoryPage;
				break;
			case 'cart':
				Component = CartPage;
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
				initialRoute = {this.state.initialRoute}
				ref="navigator"
				configureScene = {(route)=>{
					if(route.name == 'product-category'){
						return Navigator.SceneConfigs.PushFromRight;
					}
					return Navigator.SceneConfigs.PushFromRight;
				}}
				renderScene = {this._routeMapper}
			/>
		);
	}
}