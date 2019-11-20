const request = require('request');
const cheerio = require('cheerio');










request('https://www.whitehouse.gov/', (error,response, html)=> {
  if (!error && response.statusCode === 200) {
    // const $ = cheerio.load(html);
    const $ = cheerio.load(html);

    /*From meta tags */
    const description = $('meta[name=description]').attr("content");
    const keywords = $('meta[name=keywords]').attr("content");

    /*From head */
    const headTitle = $('head title').text();


    console.log(lastModified);
  } else {
    console.log("ERROR")
  }
});






