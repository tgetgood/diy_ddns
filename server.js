var express = require('express');
var app = express();

app.use(express.bodyParser());

function contains(hash, name) {
	return Object.prototype.hasOwnProperty.call(hash, name);
}

var hosts = {};
app.post('/:hostname', function(req, res) {
	// TODO: Add some sort of authentication to prevent wanton destruction. 
	var ip = (req.body.ip !== undefined ? req.body.ip : req.connection.remoteAddress);
	hosts[req.params.hostname] =  ip;

	res.statusCode = 200;
	res.write("All set.");
	res.end();
});

app.get('/:hostname', function(req, res) {
	if (contains(hosts, req.params.hostname)) {
		res.statusCode = 200;
		res.write(hosts[req.params.hostname]);
	}
	else {
		res.statusCode = 400;
		res.write('Requested host not registered with this service.');
	}
	res.end();
});
							
var port = process.argv[2] || 80;
app.listen(port);
console.log("Listening on port %d", port);

