import React , {Component} from 'react';

export default class BasePage extends Component {
	state = {
		page: 1
	}

	getInitialPageConfit(){
		this.setState({
			loaded: false
		});
	}

	getLoadNextPageConfig(): Object {
		let {page} = this.state;
		page++;
		this.setState({
			page: page,
			loadNextEnd: false
		});
		return {
			skip: (page-1)*10
		}
	}
}