import productActions from './product';
import cartActions from './cart';

module.exports = {
	...cartActions,
	...productActions,
}