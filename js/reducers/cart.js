export default (state={cartNumer:0,cartData:[],dataBlob:[]},action) => {
	switch(action.type){
		case 'LOAD_CART_DATA':
			return {...state,cartData: action.data,dataBlob:action.dataBlob,loaded:true}; 
			break;
		case 'LOAD_CART_NUMBER':
			return {...state,cartNumber: action.cartNumber};
			break;
		default:
			return state;
	}
}