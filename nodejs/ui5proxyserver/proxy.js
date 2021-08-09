var cors_proxy = require('http');
const https = require('https');
var express = require('express');

// Listen on a specific IP Address
var host = '0.0.0.0';

// Listen on a specific port, adjust if necessary
var port = 3000;


var resheaders = {
	'Content-Type': 'application/xml'
	, 'Access-Control-Allow-Origin': '*'
	, 'Access-Control-Allow-Credentials': 'true'
	, 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
	//, 'Access-Control-Allow-Headers': 'MaxDataServiceVersion, sap-contextid-accept, sap-cancel-on-close, sec-ch-ua, sec-ch-ua-mobile, dataserviceversion, x-csrf-token'
	, 'Access-Control-Allow-Headers': 'MaxDataServiceVersion, sap-contextid-accept, sap-cancel-on-close, sec-ch-ua, sec-ch-ua-mobile, dataserviceversion, x-csrf-token, content-type'
};


function checkUrlForm(strUrl) {
	var expUrl = /^http[s]?\:\/\//i;
	return expUrl.test(strUrl);
}

cors_proxy.createServer(function (req, res) {
	const arrVal = [];
	var rst = '';
	var strHeader = '';
	var i = 0;
	var sUrl = req.url.substring(1);

	const { headers, method, url, data } = req;

	if (checkUrlForm(sUrl)) {

		try {

			console.log(sUrl, headers["accept"], method);

			for (var item in headers) {
				strHeader += (item + ',');
			}

			strHeader += 'MaxDataServiceVersion, sap-contextid-accept, sap-cancel-on-close, sec-ch-ua, sec-ch-ua-mobile, dataserviceversion, x-csrf-token, content-type';
			strHeader += ', Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, x-csrf-token';
			resheaders['Content-Type'] = (headers["accept"] + "").includes("application/signed-exchange") ? 'application/xml' : method === 'HEAD' ? 'application/xml' : headers["accept"];
			resheaders['Access-Control-Allow-Headers'] = strHeader;

			let body = [];
			if (method === 'POST') { // && request.url === '/echo'

				req.on('data', (chunk) => {
					body.push(chunk);
				}).on('end', () => {

					for (var item in headers) {
						strHeader += (item + ',');
					}

					res.writeHead(200, resheaders);

					body = Buffer.concat(body).toString();
					res.end(body);
				});
			} else {

				https.get(sUrl,  (resp) => {
					
					// A chunk of data has been received.
					resp.on('data', (chunk) => {
						if (chunk != undefined && chunk != '') {
							body.push(chunk);
                        }
					});

					// The whole response has been received. Print out the result.
					resp.on('end', () => {

						if (method === 'HEAD') {
							resheaders['Transfer-Encoding'] = 'chunked';
						}

						res.writeHead(200, resheaders);

						body = Buffer.concat(body).toString();
						res.end(body);
					});

				}).on("error", (err) => {
					console.log("Error: " + err.message);
				});
			}

		} catch (error) { console.error(error); }
	}



	//res.end(rst);

	//res.writeHead(200, {'Content-Type': 'text/html'});
	//res.end('Hello World with http');
}).listen(port, host, function () {
	console.log('Running myProxy on ' + host + ':' + port);
});
