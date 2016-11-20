import _ from 'lodash';
import U from '../utils/util';
import {ListView} from 'react-native';
const LOAD_LIST: string = 'LOAD_LIST';

const loadBanner = (): void => {
	return new Promise((resolve,reject)=>{
		U.get('products/category/client',{
				limit: 5,
				where:'{"$and":[{"valid":true},{"banner":true}]}',
				order: '+priorityBanner'
		},data=>{
			let bannerData = [];
			_.map(data,(item,index)=>{
				bannerData = bannerData.concat(item.results);
			});
			resolve(bannerData);
		},(err)=>{
			reject(err);
		});
	});
}

const loadCategory = (): void => {
	return new Promise((resolve,reject)=>{
		U.get('category',{
			where:'{"$and":[{"valid":true},{"recommend":true}]}',
			order:'+seq',
			limit:999,
			skip:0
		},data=>{
			resolve(data.results);
		},(err)=>{
			reject(err);
		});
	});
}

const loadList = (): void => {
	return dispatch => {
		U.get('products/client',{
			limit:10,
			skip:0,
			where:'{"valid":true,"obvious":true}',
			order:'obviousSeq,-onlineTime'
		},data=>{
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			dispatch({
				type: LOAD_LIST,
				listData: ds.cloneWithRows(data.results),
				listLoaded: true
			});
		},()=>{
			
		});
	}
}

module.exports = {
	loadBanner,
	loadCategory,
	loadList
}