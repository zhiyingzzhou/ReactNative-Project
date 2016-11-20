import productActions from './product';
import productCategoryActions from './category';
import cartActions from './cart';

module.exports = {
	...cartActions,
	...productActions,
	...productCategoryActions
}