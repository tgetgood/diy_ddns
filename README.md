DIY_DDNS
========

Barebones personal dynDNS system.

Free dynDNS systems are getting hard to find. If all you need is a way to find your home network from your laptop from wherever you happen to be, then this is the tool for you.

The Idea:
---------

Simple REST elegance. Once the server is running, any POST to url/hostname will create an entry linking the hostname to the IP address of the sender. Subsequent GETs to url/hostname will return the IP address and nothing else. Attempting the GET a hostname that hasn't been registered returns an error message. 

If the machine you want to register with the server is hidden behind a proxy or otherwise obscured, you can add the pair "ip=a.b.c.d" to the POST body and this address will be used in place of the request origin. 

That's it.

N.B. There is no security built in. Once the server is running anyone can use it and anyone can overwrite any hostname as if ICANN had never existed. It may be prudent to hide the server behind a proxy and only allow trusted traffic. If you really are just using it for personal uses then this probably is not an issue. Hopefully some basic authentication will be in the next version.


Setting up the server
---------------------

Get npm:
  curl http://npmjs.org/install.sh | sh

Install express:
	npm install express

TODO: make a package file.

Run the server on using your favourite process immortality tool. Or live on the egde and just run it.
	node server.js [port_number]
or
	forever server.js [port_number]

By default the server runs on port 80.

Setting up the client
---------------------

The easiest way to keep the server updated is to run
	crontab -e
and add the following line:
	01 * * * * curl --data '' URL/HOSTNAME

If you're behind a proxy or there's some other reason that the server will not see the right address for you, use:
	01 * * * * curl --data "ip=$(curl 'http://automation.whatismyip.com/n09230945.asp')" URL/HOSTNAME


I started writing a client in node to update the server for systems without cron because I felt sorry for them, but I no longer feel sorry enough. If you want to finish it, pull requests are most welcome. 
	
Info:
-----

Author: Thomas Getgood
Version: 0.1

