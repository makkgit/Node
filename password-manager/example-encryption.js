var crypto = require('crypto-js');

var secretMessage = {
	name:'sumanth',
	age: 007
};
var secretKey = '123asd';

var cryptoMessage = crypto.AES.encrypt(JSON.stringify(secretMessage),secretKey);
console.log(''+cryptoMessage);

var bytes = crypto.AES.decrypt(cryptoMessage,secretKey);
var decryptedMessage = bytes.toString(crypto.enc.Utf8);
var obj = JSON.parse(decryptedMessage);
console.log(obj);