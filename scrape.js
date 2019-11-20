const request = require('request');
const cheerio = require('cheerio');

request('https://venus.cs.qc.cuny.edu/~biad2028/cs355/', (error,response, html)=> {
  if (!error && response.statusCode === 200) {
    // const $ = cheerio.load(html);
    const $ = cheerio.load(html);

    // const containerHeading = $('.container');
    // console.log(containerHeading.html());
    // console.log(containerHeading.text());

    // const output = containerHeading.find('h5').text();

    $('.topnav').each((i, el) => {
      const item = $(el).text();
      // const link = $(el).attr('href');
      console.log(item);
    });

  } else {
    console.log("ERROR")
  }
});
