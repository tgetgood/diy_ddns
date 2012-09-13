var express = require('express');
var app = express();

app.use(express.bodyParser());

function contains(hash, name) {
	return Object.prototype.hasOwnProperty.call(hash, name);
}

var hosts = {};

app.post('/', function(req, res) {
	if (req.body.hostname !== undefined && req.body.ip !== undefined) {
		hosts[req.body.hostname] = req.body.ip;
		res.statusCode = 200;
		res.write("All set.");
	}
	else {
		res.statusCode = 400;
		res.write("Invalid request.");
	}
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

