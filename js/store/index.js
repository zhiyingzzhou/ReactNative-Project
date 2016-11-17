import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducers from '../reducers';

const logger = store => next => action => {
	let result = next(action);
	return result;
}

let middlewares = [
	logger,
	thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);


export default function configureStore(onComplete: ()=>void){
	// const store = autoRehydrate()(createAppStore)(reducers);
	const store = (createAppStore)(reducers);
	let opt = {
		transform: [],
		//whitelist: ['userStore'],
	};
	// persistStore(store, opt, onComplete);
	return store;
}