import React , { Component } from 'react';
import { ListView , StyleSheet } from 'react-native';
import ProductItem from '../common/product-item';
export default class ProductList extends Component {
	_renderRow = (rowData,sectionID,rowID) => {
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
		borderBottomWidth: 0.5,
		borderColor: '#ccc',
		borderStyle: 'solid'
	},
});
