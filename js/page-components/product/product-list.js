import React , { Component } from 'react';
import { ListView , StyleSheet , PixelRatio } from 'react-native';
import ProductItem from '../common/product-item';
import {Colors} from '../../common';
export default class ProductList extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data;
	}

	_renderRow = (rowData: Object,sectionID: string,rowID: string) => {
		{/*渲染每一个列表*/}
		const {data} = this.props;
		{/*如果为列表中的最后一行,不添加bottom-border*/}
		const style = rowID != data._cachedRowCount - 1 ? styles.containerWithBottom : null;
		return 	<ProductItem 
					{...this.props}
					data={rowData} 
					style={style} 
				/>
	}

	render() {
		const {data} = this.props;
		if(data._cachedRowCount === 0){
			return null;
		}
		return 	<ListView 
					dataSource={data}
					renderRow={this._renderRow}
					style={{
						backgroundColor: '#FFF'
					}}
				/>
	}
}

const styles = StyleSheet.create({
	containerWithBottom: {
		borderBottomWidth: 1/PixelRatio.get(),
		borderColor: Colors.weakGrayColor,
		borderStyle: 'solid'
	},
});
