import {combineReducers} from 'redux';
import Cart from './cart';
import Product from './product';

module.exports = combineReducers({
	cart: Cart,
	product: Product
});