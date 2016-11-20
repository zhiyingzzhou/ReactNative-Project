import U from '../utils/util';
const getCategoryProductData = (categoryId: number,orderParams: Object,skip: number): Promise=> {
	return new Promise((resolve,reject)=>{
		const {order,field} = orderParams,
		symbol = !!order ? '+' : '-',
		orderStr = symbol + field;
		U.get('category/'+categoryId+'/products',{
			limit: 10,
			skip: skip,
			where:'{"$and":[{"valid":true},{"expireTime":{"$gt":1478887859449}},{"onlineTime":{"$lt":1478887859449}}]}',
			order:orderStr
		},data=>{
			resolve(data);
		},(err)=>{
			reject(err);
		});
	});
}

module.exports = {
	getCategoryProductData
}