var argv = require('yargs')
	.command('hello','Greets the user',function (params) {
		params.options({
			firstName: {
				demand: true,
				alias: 'n',
				description: 'your first name goes here'
			},
			lastName:{
				demand: false,
				alias: 'l',
				description: 'your last name goes here'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var cmd = argv._[0];
console.log(argv);
if(cmd === 'hello' && typeof argv.firstName !== 'undefined' 
	&& typeof argv.lastName !== 'undefined'){
	console.log('Hello '+argv.firstName+' '+argv.lastName);
}else if(cmd === 'hello' && typeof argv.firstName !== 'undefined'){
	console.log('Hello '+argv.firstName)
}
else if(cmd === 'hello'){
	console.log('Hello World');
}