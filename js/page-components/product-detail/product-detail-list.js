import React , { Component } from 'react';
import { View , Text , TouchableOpacity } from 'react-native';
import { Item } from '../../components';
import Picker from 'react-native-picker';

import AreaJson from '../../utils/area';

export default class ProductDetailList extends Component {

	state = {
		pickedValue: ["江西", "上饶", "上饶县"]
	};

	_showAreaPicker = () => {
		let data = [];
		for(let i =0;i<AreaJson.length;i++){
			let city = [];
			for(let j=0;j<AreaJson[i].city.length;j++){
				let _city = {}
				_city[AreaJson[i].city[j].name] = AreaJson[i].city[j].area;
				city.push(_city);
			}
			let _data = {};
			_data[AreaJson[i].name] = city;
			data.push(_data);
		}
        Picker.init({
            pickerData: data,
            selectedValue: this.state.pickedValue,
            onPickerConfirm: pickedValue => {
            	this.setState({
            		pickedValue:pickedValue
            	});
            },
            onPickerCancel: pickedValue => {
                this.setState({
            		pickedValue:pickedValue
            	});
            }
        });
        Picker.show();
	}

	render() {
		const {pickedValue} = this.state;
		const {data,navigator} = this.props;
		return 	(
					<View>
						<Item 
							title="尺码:170/92B/M,颜色分类:深灰色"
							link={true}
							style={{
								marginVertical: 5
							}}
						/>
						<Item 
							title='送至'
							link={true}
							onPress={()=>this._showAreaPicker()}
					 	>
					 		<View style={{
					 			position:'absolute',
					 			top: 0,
					 			bottom: 0,
					 			left: 50,
					 			flexDirection: 'row',
					 			alignItems:'center'
					 		}}>
					 			<Text>{pickedValue.join(' ')}</Text>
					 		</View>
					 	</Item>
						<Item 
							title='暂无评论'
							style={{
								marginVertical: 5,
							}}
					 	/>
						<Item 
							title='商品详情'
							link={true}
							onPress={()=>{
								navigator.push({
									title:'商品详情',
									name: 'product-detail-webview',
									params:{detailHTML:data.detail}
								});
							}}
					 	/>
					 	<Item 
					 		title='商品编号'
					 		after={data.serialNumber}
					 		style={{
					 			marginVertical: 5
					 		}}
					 	/>
					</View>
				);
	}
}