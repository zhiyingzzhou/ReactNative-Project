import React , { Component } from 'react';
import { View , Text , TouchableOpacity , InteractionManager } from 'react-native';
import { Item } from '../../components';
import Picker from 'react-native-picker';

import AreaJson from '../../utils/area';

export default class ProductDetailList extends Component {

	static defaultProps = {
		data: {}
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data;
	}

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

	_getCustomAttrText = customAttr => {
		let str = '';
		customAttr.map( (item,index)=>{
			str += item.text;
			if(customAttr.length > 1&&index<customAttr.length-1){
				str += '/';
			}
		});
		return '选择 : '+str;
	}

	render() {
		const {pickedValue} = this.state,
		{data,navigator,showModal} = this.props,
		customAttr = data&&data.customAttr&&data.customAttr.length > 0 ? JSON.parse(data.customAttr) : [];
		return 	(
					<View>
						{customAttr.length > 0 &&
							<Item 
								title={this._getCustomAttrText(customAttr)}
								link={true}
								style={{
									marginTop: 5
								}}
								onPress={showModal}
							/>
						}
						<Item 
							title='送至 '
							link={true}
							style={{
								marginTop: 5
							}}
							onPress={this._showAreaPicker}
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
								marginTop: 5,
							}}
					 	/>
						<Item 
							title='商品详情'
							link={true}
							style={{
					 			marginTop: 5
					 		}}
							onPress={()=>{
								InteractionManager.runAfterInteractions(()=>{
									navigator.push({
										title:'商品详情',
										name: 'product-detail-webview',
										params:{detailHTML:data.detail}
									});
								});
							}}
					 	/>
					 	<Item 
					 		title='商品编号'
					 		after={data.serialNumber ||　''}
					 		style={{
					 			marginVertical: 5
					 		}}
					 	/>
					</View>
				);
	}
}