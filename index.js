const rp = require('request-promise-native');
const Apify = require('apify');
const Readability = require('./readability/Readability.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

process.env.APIFY_LOCAL_STORAGE_DIR='./apify_local_storage';
process.env.APIFY_MEMORY_MBYTES='999mb'

const options_requests = {
	sources: [
		{ 
			url: 'https://hackernoon.com/how-does-tor-really-work-c3242844e11f'
		},
	]
}

async function initList(){
	const requestList = new Apify.RequestList(options_requests);
	await requestList.initialize();
	return requestList;
}

async function initCrawler(requestList){
	const crawler = await new Apify.BasicCrawler({
	    requestList,
			handleRequestFunction: handleRequestFunction,
	})
	crawler.run();
}

async function handleRequestFunction ({ request }) {
	await Apify.pushData({
    	url: request.url,
        html: await rp(request.url),
	})
    const html = await rp(request.url)
	const dom = new JSDOM(html)
	const article = new Readability(dom.window.document).parse();
	const metadata = {
		title: article.title,
		length: article.length,
		excerpt: article.excerpt,
		byline: article.byline,
		dir: article.dir,
	}
	let metadata_path = path.join( __dirname, "metadata.json"  )
	let content_path = path.join( __dirname, "content.html"  )
	fs.writeFile(metadata_path, metadata, function(err,data){
		console.log(metadata)
	})
	const template = fs.readFile('./template.html', function(err, data){
		let template = data.toString('utf8');
		const template_dom = new JSDOM(template)
		const template_document = template_dom.window.document;
		template_document.querySelector('body').innerHTML = article.content
		const template_serialized = template_dom.serialize()
	

		fs.writeFile(content_path, template_serialized, function(err,data){
			console.log(metadata.title)
		})
	})
}
//console.log(handleRequestFunction)

initList()
	.then( (requestList) =>  {
		initCrawler(requestList)
		})
