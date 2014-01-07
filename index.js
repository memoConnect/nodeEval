var	Router	= require('routes'),
	router	= Router(),
	http	= require('http');



router.addRoute("/test", function(res, param) {
	res.write("/test")
	res.write(JSON.stringify(param))	
});

router.addRoute("*", function(res, param) {
	res.write("*")
	res.write(JSON.stringify(param))
});


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});

	if(param = router.match(req.url)) param.fn(res, param)

	res.end()

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');