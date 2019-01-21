const downcache = require("downcache");
const fs 		= require("fs");

downcache("https://w3c.github.io/html/links.html", (err, resp, body) => {
	fs.writeFile('wiki', body, function(){
		console.log('file written');
	})
});
