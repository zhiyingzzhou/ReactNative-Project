export default (state={listData:[]},action: Object): void=> {
	switch(action.type){
		case 'LOAD_LIST':
			return {
				listData: action.listData,
				listLoaded: action.listLoaded
			}
		default:
			return state;
	}
}