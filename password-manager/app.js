console.log('starting password-manager');

var storage = require('node-persist');
storage.initSync();

var crypto = require('crypto-js');

var argv =  require('yargs')
			.command('create','create a new account', function(params){
				params.options({
					name: {
						demand: true,
						alias: 'n',
						description: 'please enter your name',
						type: 'string'
					},
					username: {
						demand: true,
						alias: 'u',
						description: 'please enter your username',
						type: 'string'
					},
					password: {
						demand: true,
						alias: 'p',
						description: 'please enter your password',
						type: 'string'
					},
					masterPassword: {
						demand: true,
						description: 'key for encryption',
						alias: 'm',
						type: 'string'
					}
				})
			})
			.command('get','enter the desired username',function(params){
				params.options({
					username: {
						demand: true,
						alias: 'u',
						description: 'please enter your username',
						type: 'string'
					},
					masterPassword: {
						demand: true,
						description: 'key for decryption',
						alias: 'm',
						type: 'string'
					}
				})
			})
			.argv;


function getAccounts(masterPassword){	
	var accounts = storage.getItemSync('AccountStore');	
	if (typeof accounts !== 'undefined'){
		var bytes = crypto.AES.decrypt(accounts,masterPassword);
		return JSON.parse(bytes.toString(crypto.enc.Utf8));
	} 	
}

function saveAccounts(accounts, masterPassword){	
	var accountsString = JSON.stringify(accounts);	
	var enryptedAccounts = crypto.AES.encrypt(accountsString,masterPassword);
	console.log(typeof enryptedAccounts)	
	storage.setItemSync('AccountStore',enryptedAccounts.toString());
	return accounts;
}

function createAccount(newAccount,masterPassword){
		
	var accounts = getAccounts(masterPassword);	
	if(typeof accounts === 'undefined'){
		console.log('in createAccount - getAccounts returned nothing');
		accounts=[];		
	}
	accounts.push(newAccount);			
	saveAccounts(accounts,masterPassword);
	return newAccount;	
}


function getAccount(accountName,masterPassword){
	
	var accounts = getAccounts(masterPassword);
	var matchedAccount;
	accounts.forEach(function (account){
		if(account.accountName === accountName){
			matchedAccount = account;
			return;
		}
	});
	return matchedAccount;
}

var newTalakay = {
	accountName: 'faceBook',
	username: 'rxr',
	password: 'neebonda'
};
 //createAccount(newTalakay);
 var cmd = argv._[0];
 console.log(argv);
 
 if (cmd === 'get' ){
 	try{
 		console.log(getAccount(argv.username,argv.masterPassword));
 	} catch(e){
 		console.log('unable to retreive account');
 		console.log(e.message);
 	}
 	
 }
 
 //console.log(getAccount('faceBook'));

if (cmd === 'create'){
	try{
		createAccount({
		accountName: argv.name,
		username: argv.username,
		password: argv.password
	
		}, argv.masterPassword);
	} catch(e){
		console.log('unable to create Account');
		console.log(e.message);
	}
	
}