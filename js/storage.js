import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
module.exports = function() {
	var storage = new Storage({
	  size: 1000,
	  storageBackend: AsyncStorage,
	  defaultExpires: 1000 * 3600 * 240,
	  enableCache: true,
	})  
	global.Storage = storage;
}