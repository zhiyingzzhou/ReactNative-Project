export default (state={cartNumer:0,cartData:[]},action) => {
	switch(action.type){
		case 'LOAD_CART_NUMBER':
			return {...state,cartNumber: action.cartNumber};
			break;
		default:
			return state;
	}
}