var http = require('http');

if (process.argv.length < 3) {
	console.log("Usage: " + process.argv[0] + process.argv[1] + " DDNS_SERVER_URL HOSTNAME [PORT]");
	process.exit(-1);
}

var url = process.argv[2];
var host = process.argv[3];
var port = process.argv[4] || 80;
var options = {
	hostname: url,
	path:  host,
	port: port,
	method: 'POST'
};

console.log(options);

setInterval(function() {
	http.request(options, function(res) {
		if (res.statusCode !== 200) {
			// TODO: Better error message.
			console.error("Could not connect to server.");
		}
	});
}, 1000);
// Update once per hour. This should be an option as well, but now we'll soon
// be needing real option parsing... 
