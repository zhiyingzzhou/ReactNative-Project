import {InteractionManager} from 'react-native';
import _ from 'lodash';
import C from '../config/config';
const LOAD_CART_DATA: string = 'LOAD_CART_DATA';
const LOAD_CART_NUMBER: string = 'LOAD_CART_NUMBER';

const getCartData = (): Promise => {
	return new Promise((resolve,reject)=>{
		Storage.getAllDataForKey(C.storageCartKey)
		.then(ret=>resolve(ret));
	});
}

const getBatchCartDataWithIds = (ids: Array<number>): Promise => {
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			Storage.getBatchDataWithIds({
				key: C.storageCartKey,
				ids:ids,
			})
			.then(data=>resolve(data))
			.catch(err=>reject(err));
		},500);
	});
}

const getCartNumer = (dispatch): void => {
	Storage.getIdsForKey(C.storageCartKey)
	.then(ids=>{
		dispatch({
			type: LOAD_CART_NUMBER,
			cartNumber: ids.length
		});
	});
}

const addProductToCart = (data: Object,buyNumber: number=1): void => {
	return dispatch => {
		getCartData()
		.then(ret=>{
			const {id,selectedAttrKeyArr=[]} = data;
			const hasSameIdIndex: number= _.findIndex(ret,item=>{
				return item.data.id === id;
			});
			if(hasSameIdIndex !== -1&&_.isEqual(ret[hasSameIdIndex].data.selectedAttrKeyArr,selectedAttrKeyArr)){
				ret[hasSameIdIndex].count += 1;
			}else{
				const saveData = {
					count: buyNumber,
					data: data
				};
				Storage.save({
					key: C.storageCartKey,
					id: ret.length,
					rawData: saveData,
					expires: null
				});
			}
			getCartNumer(dispatch);
		},err=>{
			console.log(err);
		})
	}
}

const loadCartNumber = (): void => {
	return dispatch => {
		getCartNumer(dispatch);
	}
}

module.exports = {
	getCartData,
	getBatchCartDataWithIds,
	addProductToCart,
	loadCartNumber
};