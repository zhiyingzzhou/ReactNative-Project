import React , { Component , PropTypes } from 'react';
import {ScrollView,RefreshControl} from 'react-native';
import {Colors} from '../common';
export default class ScrollViewWithRefreshControl extends Component {
	static defaultProps = {
		refreshing:false,
		onRefresh: () => {},
		progressViewOffset:0
	};
	static propTypes = {
		refreshing: PropTypes.bool,
		onRefresh: PropTypes.func,
		progressViewOffset: PropTypes.number
	};

	_onScroll = (evt,gestureState) => {
	}

	render() {
		const {refreshing,onRefresh,progressViewOffset,
			children} = this.props;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl 
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={Colors.progressColors}
						progressViewOffset={progressViewOffset}
						progressBackgroundColor={Colors.progressBackgroundColor}
					/>
				}
				onScroll={this._onScroll}
			>
				{children}
			</ScrollView>
		);
	}
}