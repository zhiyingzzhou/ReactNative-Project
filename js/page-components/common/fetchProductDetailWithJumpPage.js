import U from '../../utils/util';
module.exports = function(productId){
	const {navigator,onRequestStart,onRequestEnd} = this.props;
	if(onRequestStart){
		onRequestStart();
	}
	U.get('products/'+productId,data=>{
		if(navigator){
			navigator.push({
				title:'商品详情',
				name:'product-detail',
				params:{data:data}
			});
		}else{
			throw new Error('You forget pass navigator props from ProductItem Component!');
		}
		if(onRequestEnd){
			onRequestEnd();
		}
	});
}