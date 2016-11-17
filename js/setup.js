import React from 'react';
import { Navigator , BackAndroid , ToastAndroid} from 'react-native';
import {Provider} from 'react-redux';
import configurStore from './store';
import App from './app';
export default class SetUp extends React.Component {

	state = {
		store:configurStore()
	};

	render() {
		return (
			<Provider store={this.state.store}>
				<App />
			</Provider>
		)
	}
}