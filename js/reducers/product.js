export default (state={bannerData:[],categoryData:[],listData:[]},action: Object): void=> {
	switch(action.type){
		case 'LOAD_BANNER':
			return {
				...state,
				bannerData:action.bannerData,
				bannerLoaded:action.bannerLoaded
			}
			break;
		case 'LOAD_CATEGORY':
			 return {
			 	...state,
			 	categoryData:action.categoryData,
			 	categoryLoaded: action.categoryLoaded
			 }
			break;
		case 'LOAD_LIST':
			return {
				...state,
				listData: action.listData,
				listLoaded: action.listLoaded
			}
		default:
			return state;
	}
}