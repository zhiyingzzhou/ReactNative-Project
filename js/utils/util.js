  import {Dimensions} from 'react-native';

  module.exports = (function(){
	let Util = () => {
		return new Util.prototype.init();
	}

	Util.fn = Util.prototype = {
		constructor: Util,
		init(){
			return this;
		},
		serialize(url,params){
			let tmpArr = [];
			if(arguments.length == 0){
				throw new Error('serialize method must have at least one parameter!'+
				'\nerror position at : util.js');
			}
			for(let i in params){
				let val = typeof params[i] === 'object' ? JSON.stringify(params[i]) : params[i];
				tmpArr.push(i+'='+encodeURIComponent(val));
			}
			return 'https://www.maxwon.cn/1.0/'+url+'?'+tmpArr.join('&');
		},
		getScreenWidth(){
			return Dimensions.get('window').width;
		},
		getScreenHeight(){
			return Dimensions.get('window').height;
		}
	}

	Util.fn.init.prototype = Util.fn;

	return new Util();

})();