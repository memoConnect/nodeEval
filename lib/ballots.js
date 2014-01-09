var	crypto = require('crypto'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://nodeEval:whacUN7930ucFEF56@widmore.mongohq.com:10010/nodeEval');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// nothing here yet
});

var ballotSchema 				= 	mongoose.Schema({
												opts	:	Array,
												result	:	[Array]
										})

var Ballot						= 	mongoose.model('Ballot', ballotSchema)

/*

	fluffy.save(function (err, fluffy) {
	  if (err) // TODO handle the error
	  fluffy.speak();
	});


	Kitten.find(function (err, kittens) {
	  if (err) // TODO handle err
	  console.log(kittens)
	})

	Kitten.find({ name: /^Fluff/ }, callback)
*/

this.validate			=	function(options) {
								var	valid 	= 	true,
									opts	=	{}

								if(Array.isArray(options)){
									options.forEach(function(option, index){
										valid = valid && typeof option == 'string' && !opts[option]
										opts[option] = true
									})
								}else{
									valid = false
								}

								return(valid)
							}

this.add				=	 function(options) {

								if(!this.validate(options)) return({error: 'invalid options.'})

								var time 		= 	new Date(),
									ballot		= 	new Ballot({
														opts		:	options
													}),
									promise 	=	new mongoose.Promise

								ballot.save(function (err, data) {
									if(err) {
								   		promise.error(err);
								   		return;
								 	}
									promise.complete(data)
								})

								//console.dir(promise)

								return promise
							}

this.get				=	function(id) {
								return Ballot.find({_id: id}).exec()
							}