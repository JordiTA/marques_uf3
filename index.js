#!/usr/bin/node

const http = require("http");
const fs = require("fs");

console.log("Inicializando el servidor web");

http.createServer((request, response) => {
	console.log(request.url);

	/*Workaround hasta la siguiente lección*/
	if (request.url == "/stars.jpg"){
		fs.readFile("stars.jpg", (error, content) => {
			response.writeHead(200, {'Content-Type': 'image/jpeg'}); 
			response.write(content);
			response.end();
		});
	}
	else {

	fs.readFile("index.html", (error, content) => {

		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(content);
		response.end();

	});

	}

}).listen(8080);
