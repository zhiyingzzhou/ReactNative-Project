import {InteractionManager,ListView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import _ from 'lodash';
import C from '../config/config';
const LOAD_CART_NUMBER: string = 'LOAD_CART_NUMBER';
const LOAD_CART_DATA: string = 'LOAD_CART_DATA';

const database_name = 'Cart.db',
table_name = 'Cart';
database_version = '1.0',
database_displayName = 'SQLite Test Database',
database_size = 200000;
let db;

function generateQueryStr(data: Object): void{
	return `SELECT * FROM ${table_name} WHERE productId = ${data.id}`;
}

function generateUpdateStr(originCount: number,data: Object): void{
	return `UPDATE ${table_name} SET count = ${originCount+data.count} WHERE productId = ${data.productId ? data.productId : data.id}`;
}

function generateDeleteStr(data: Object){
	return `DELETE FROM ${table_name} WHERE productId = ${data.productId}`;
}

function generateUpdateIsSelectedStr(data: Object,type: boolean){
	return `UPDATE ${table_name} SET isSelected=${type} WHERE productId = ${data.productId}`;
}

function successCB(): void{
	console.log('SQL excuted...');
}

function errorCB(err): void{
	console.log('Error: ',err);
}

function openCB(): void{
	console.log('Database OPEN');
}

function createDB(tx: Object): void{
	//删除已经存在的购物车表
	tx.executeSql(`DROP TABLE IF EXISTS ${table_name};`);
	//创建购物车表
	tx.executeSql(`CREATE TABLE IF NOT EXISTS ${table_name}(`
		+ `id INTEGER PRIMARY KEY NOT NULL,`
		+ `count INTEGER NOT NULL,`
		+ `productId INTEGER NOT NULL,`
		+ `title NVARCHAR(255),`
		+ `coverIcon VARCHAR(255),`
		+ `price FLOAT,`
		+ `stock INTEGER,`
		+ `customAttr NTEXT,`
		+ `priceMap TEXT,`
		+ `selectedAttrKeyArr TEXT,`
		+ `isSelected TINYINT) ; `, [], successCB, errorCB);
	console.log('创建购物车表成功');
}

function openDatabase(): void{
	db = SQLite.openDatabase(database_name,database_version,database_displayName,database_size,openCB,errorCB);
}

function insertCartCB(tx: Object,data: Object){
	tx.executeSql(
		`INSERT INTO ${table_name} `
		+ `(count,productId,title,coverIcon,price,stock,customAttr,priceMap,selectedAttrKeyArr,isSelected)`
		+ ` VALUES `
		+ ` ( ${data.count}, ${data.id} , '${data.title}', '${data.coverIcon}' , ${data.price}, ${data.stock},`
		+ `'${data.customAttr}' , '${JSON.stringify(data.priceMap)}' , '${JSON.stringify(data.selectedAttrKeyArr)}' , 0 ) ;`
		,[],successCB,errorCB);
}

function updateCartDB(tx: Object,originCount: number,data: Object): void{
	//如果商品selectedAttrKey为空数组就就查询是否有相同的id,
	//否则查询是否有相同的id和selectedAttrKey
	const updateStr = _.isEqual(data.selectedAttrKeyArr,[]) ? generateUpdateStr(originCount,data)
	: generateUpdateStr(originCount,data) 
	+ ` and selectedAttrKeyArr = '${typeof data.selectedAttrKeyArr === 'array'?  JSON.stringify(data.selectedAttrKeyArr) : data.selectedAttrKeyArr}'`;
	tx.executeSql(updateStr,[],successCB,errorCB);
}

function queryCartNumber(dispatch): void{
	db.executeSql('SELECT count FROM '+table_name,[],results=>{
		let cartNumber = 0,
		len = results.rows.length;
		for(let i=0;i<len;i++){
			cartNumber += results.rows.item(i).count;
		}
		dispatch({
			type: 'LOAD_CART_NUMBER',
			cartNumber: cartNumber
		});
	},(err)=>{
		dispatch({
			type: 'LOAD_CART_NUMBER',
			cartNumber: 0
		});
	});
}

function queryCartData(dispatch,start: number): void{
	let ds = new ListView.DataSource({
		rowHasChanged: (row1,row2) => row1 !== row2
	});
	db.executeSql(`SELECT`
		+ ` count,`
		+ `productId`
		+ `,title,`
		+ `coverIcon,`
		+ `price,`
		+ `stock,`
		+ `customAttr,`
		+ `priceMap,`
		+ `selectedAttrKeyArr,`
		+ `isSelected from ${table_name}; limit ${start},10`,[],results=>{
		len = results.rows.length,
		data = [];
		for(let i=0;i<len;i++){
			data.push(results.rows.item(i));
		}
		dispatch({
			type: LOAD_CART_DATA,
			data: ds.cloneWithRows(data),
			dataBlob: data
		});
	},error=>{
		dispatch({
			type: LOAD_CART_DATA,
			data: ds.cloneWithRows([]),
			dataBlob: []
		});
	});
}

function delData(tx,data){
	//如果商品selectedAttrKey为空数组就就查询是否有相同的id,
	//否则查询是否有相同的id和selectedAttrKey
	const deleteStr = _.isEqual(data.selectedAttrKeyArr,[]) ? generateDeleteStr(data) 
	: generateDeleteStr(data)+ ` and selectedAttrKeyArr = '${data.selectedAttrKeyArr}'`;
	tx.executeSql(deleteStr,[],successCB,errorCB);
}


const loadCartNumber = (): void => {
	if(!db){
		openDatabase();
	}
	return dispatch => {
		queryCartNumber(dispatch);
	}
}

const addProductToCart = (data: Object): void => {
	if(!db){
		openDatabase();
	}
	return dispatch => {
		//如果商品selectedAttrKey为空数组就就查询是否有相同的id,
		//否则查询是否有相同的id和selectedAttrKey
		const queryStr: string= _.isEqual(data.selectedAttrKeyArr,[]) ? generateQueryStr(data) 
		: generateQueryStr(data) + ` and selectedAttrKeyArr = '${JSON.stringify(data.selectedAttrKeyArr)}'`;
		//查询有没有相同的id和attrkey的商品
		db.executeSql(queryStr,[],results=>{
			const rows = results.rows;
			//如果有直接更新count
			if(rows.length === 1){
				db.transaction(tx=>{
					updateCartDB(tx,rows.item(0).count,data);
				},errorCB,()=>{
					queryCartNumber(dispatch);
				});
			}
			//没有添加商品
			if(rows.length === 0){
				db.transaction(tx=>{
					insertCartCB(tx,data);
				},errorCB,()=>{
					queryCartNumber(dispatch);
				});
			}
		},error=>{
			//没有数据表创建数据表后添加
			db.transaction(createDB,errorCB,()=>{
				db.transaction(tx=>{
					insertCartCB(tx,data);
				},errorCB,()=>{
					queryCartNumber(dispatch);
				});
			});
		});
	}
	
}

const updateCartNumber = (data: Object): void => {
	if(!db){
		openDatabase();
	}
	return dispatch => {
		db.transaction(tx=>{
			updateCartDB(tx,1,data);
		},errorCB,()=>{
			queryCartNumber(dispatch);
			queryCartData(dispatch,0);
		});
	}
}

const deleteProductFromCart = (data: Object): void=> {
	if(!db){
		openDatabase();
	}
	return dispatch => {
		InteractionManager.runAfterInteractions(()=>{
			db.transaction(tx=>{
				delData(tx,data);
			},errorCB,()=>{
				queryCartData(dispatch,0);
				queryCartNumber(dispatch);
			});
			
		});
	}
}

const loadCartData = (start): void=>{
	if(!db){
		openDatabase();
	}
	return dispatch => {
		queryCartData(dispatch,start);
	}
}

const selectProduct = (data: Object,isSelected: number): void=>{
	if(!db){
		openDatabase();
	}
	return dispatch => {
		let updateStr: string= '';
		if(data.hasOwnProperty('isSelectAll')){
			if(data.isSelectAll){ 
				updateStr = `UPDATE ${table_name} SET isSelected = 1 WHERE isSelected = 0`;
			}else{
				updateStr = `UPDATE ${table_name} SET isSelected = 0 WHERE isSelected = 1`;
			}
		}else{
			//如果商品selectedAttrKey为空数组就就查询是否有相同的id,
			//否则查询是否有相同的id和selectedAttrKey
			updateStr = _.isEqual(data.selectedAttrKeyArr,[]) ? generateUpdateIsSelectedStr(data,isSelected)
			: generateUpdateIsSelectedStr(data,isSelected)+` and selectedAttrKeyArr = '${data.selectedAttrKeyArr}'`;
		}
		db.executeSql(updateStr,[],()=>{
			queryCartData(dispatch,0);
		},errorCB);
	}
}

module.exports = {
	loadCartNumber,
	addProductToCart,
	loadCartData,
	updateCartNumber,
	deleteProductFromCart,
	selectProduct
};