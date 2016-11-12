import React , { Component , PropTypes } from 'react';
import {ScrollView,RefreshControl} from 'react-native';

export default class ScrollViewWithRefreshControl extends Component {
	static defaultProps = {
		refreshing:false,
		onRefresh:()=>{},
		progressViewOffset:0,
	};
	static propTypes = {
		refreshing: PropTypes.bool,
		onRefresh: PropTypes.func,
		progressViewOffset: PropTypes.number
	};

	render() {
		const {refreshing,onRefresh,progressViewOffset,children} = this.props;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl 
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={['#FFF']}
						progressViewOffset={progressViewOffset}
						progressBackgroundColor="#183C87"
					/>
				}
			>
				{children}
			</ScrollView>
		);
	}
}