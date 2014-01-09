var	Router	= require('routes'),
	router	= Router(),
	http	= require('http'),
	ballots	= require('./lib/ballots')





http.createServer(function (req, res) {

	//routing:

	function render(data) {
		console.log(data)
		res.writeHead(200, {'Content-Type': 'application/json'})        
		res.write(JSON.stringify(data))
		res.end()
	}


	router.addRoute("/test/:id", function() {
		return(this)
	});

	router.addRoute("/ballot/:id", function(data) {
		ballots.get(this.params.id).then(render)
	});

	router.addRoute("/ballot", function(data) {
		ballots.add(data).then(render)
	});

	router.addRoute("*", function() {
		return({error: 'route not found.'})
	});


	//get POST body, call controller


 	var json = ''

    req.on('data', function (chunk) {
        json += chunk
    })

    req.on('end', function () {
    	var url 	= req.url
    		data	= {}

		try {
			data	=	JSON.parse(json);
		} catch (e) {
			data	=	{}
			console.log(e);
		}

		JSON.stringify(router.match(url).fn(data))
    })
	

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/')