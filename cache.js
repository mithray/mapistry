const express = require('express');
var mkdirp = require('mkdirp');
const path = require('path');
const app = express();
const port = 8082;
const wget = require('wget-improved');
const fs	= require('fs');
const cache_path = path.join(__dirname,'cache');
const options = {
	host: 'localhost'
};

function download(src, output_path, options){
//	let download = wget.download(src, output_path, options)
	//src = 'https://www.w3.org/TR/SRI/'
	let download = wget.download( src, output_path, options)

	download.on('error', function(err) {
	    console.log(err);
	});
	download.on('start', function(fileSize) {
		console.log('download start')
	    console.log(fileSize);
	});
	download.on('end', function(data) {
	   	console.log(data);
/*
		fs.writeFile(output_path, data, function(err, res){
			console.log('download end')
		})
*/
		return output_path
	});
	download.on('progress', function(progress) {
	    typeof progress === 'number'
	    // code to show progress bar
	});

}

app.get('/:domain', (req, res) => {
	let domain = req.params.domain
	let src = 'https://' + domain;
	let output_directory = path.join( cache_path, domain);
	let output_path = path.join( output_directory, 'index.html');
    
	async function respond(){

		mkdirp(output_directory, function (err) {
			if (err) console.log(err)
			else console.log('pow!')
		});
		await download(src, output_path, options)
		
		//fs.readFile(output_path,function(err, data){
	
			res.sendFile(output_path)

		//})
	}

	respond();
	
		
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



