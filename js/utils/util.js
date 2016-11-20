  import {Dimensions,StatusBar,Platform} from 'react-native';
  import C from '../config/config';
  
  module.exports = (function(){
	let Util = () => {
		return new Util.prototype.init();
	}

	Util.fn = Util.prototype = {
		constructor: Util,
		init(){
			return this;
		},
		serialize(url: string,params: Object): string{
			let tmpArr = [] , getParams = '';
			if(arguments.length === 0){
				throw new Error(`serialize method must have at least one parameter!\nerror position at : util.js`);
			}
			if(params&&typeof params === 'object'){
				for(let i in params){
					tmpArr.push(i+'='+encodeURIComponent(params[i]));
					getParams = '?'+tmpArr.join('&');
				}
			}
			return C.url+url+getParams;
		},
		getScreenWidth(): Number{
			return Dimensions.get('window').width;
		},
		getScreenHeight(): Number{
			return Dimensions.get('window').height;
		},
		getPageHeight(): Number{
			if(Platform.OS === 'android'){
				const {currentHeight} = StatusBar;
				return Dimensions.get('window').height - currentHeight;
			}else{
				throw new Error(`In ios device can't get device StatusBar height!`);				
			}
		},
		get(url: string,params: Object,callback: Function,catchFun: Function): void{
			//封装的get请求
			if(typeof url === 'function'){
				throw new Error('must hava url parameter!');
			}
			if(typeof params === 'function'){
				callback = params;
			};
			if(typeof params === 'function' && typeof callback === 'function'){
				callback = params;
				catchFun = callback;
			}
			const parseUrl = this.serialize(url,params);
			fetch(parseUrl,{
				headers: {
					'X-ML-APIKey':C.APIKey,
					'X-ML-AppId':C.AppId
				}
			})
			.then(response => response.json())
			.then(responseData => callback ? callback(responseData) : null)
			.catch(error=>{
				if(catchFun){
					catchFun(error);
				}else{
					console.log('Error:network request failed!');
				}
			});
		}
	}

	Util.fn.init.prototype = Util.fn;

	return new Util();

})();