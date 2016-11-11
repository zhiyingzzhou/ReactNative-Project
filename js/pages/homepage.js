import React , { Component } from 'react';
import { View ,Text , StyleSheet , Image , ScrollView , ActivityIndicator } from 'react-native';
import {BackNavBar,Page} from '../components';
import {Banner , Category , ProductList} from '../page-components/product';
export default class HomePage extends Component {
	state = {
		animating:false
	}

	showIndicator = () => {
		this.setState({
			animating:true
		});
	}
	hideIndicator = () => {
		this.setState({
			animating:false
		});
	}
	render() {
		return (
			<Page>
				<BackNavBar {...this.props} />
				<ScrollView>
					<Banner />
					<Category />
					<ProductList 
						{...this.props} 
						showIndicator={this.showIndicator} 
						hideIndicator={this.hideIndicator}
					/>
				</ScrollView>
				{this.state.animating&&
					<ActivityIndicator
				        animating={this.state.animating}
				        style={styles.showIndicator}
				        size="large"
			      	/>
				}
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	showIndicator: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
    	backgroundColor: 'rgba(0,0,0,.5)'
	}
});