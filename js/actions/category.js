const getCategoryProductData = () => {
	U.get('category/'+params.categoryId+'/products',{
		limit: 10,
		skip: 0,
		where:'{"$and":[{"valid":true},{"expireTime":{"$gt":1478887859449}},{"onlineTime":{"$lt":1478887859449}}]}',
		order:orderStr
	},data=>{
		setTimeout(()=>{
			this.setState({
				data:this.state.data.cloneWithRows(data.results),
				item: item,
				isRefreshing:false,
				loaded: true
			});
		},500);
	},()=>{
		this.setState({
			isRefreshing:false
		});
	});
}