const rp = require('request-promise-native');
const Apify = require('apify');
const Readability = require('./readability/Readability.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

process.env.APIFY_LOCAL_STORAGE_DIR='./apify_local_storage';
// Prepare a list of URLs to crawl
const requestList = new Apify.RequestList({
  sources: [
   //   { url: 'https://github.com/GoogleChrome/puppeteer/' },
      { 
		url: 'https://www.html5rocks.com/en/tutorials/casestudies/box_dnd_download/' 
		},
  ],
});

(async () => {
	await requestList.initialize();
})();

// Crawl the URLs
const crawler = new Apify.BasicCrawler({
    requestList,
    handleRequestFunction: async ({ request }) => {
        // 'request' contains an instance of the Request class
        // Here we simply fetch the HTML of the page and store it to a dataset
        await Apify.pushData({
            url: request.url,
            html: await rp(request.url),
        })
        var html = await rp(request.url)

		var dom = new JSDOM(html)
		var article = new Readability(dom.window.document).parse();
		console.log(article.content)
		console.log(article.title)
		console.log(article.excerpt)
		console.log(article.byline)
		console.log(article.length)
	
    },
});

(async () => {
	await crawler.run();
})();

