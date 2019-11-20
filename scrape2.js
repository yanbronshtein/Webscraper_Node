const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
request('https://venus.cs.qc.cuny.edu/~biad2028/cs355/', (error,response, html)=> {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);


    $('.topnav').each((i, el) => {
      const item = $(el).text();
      // const link = $(el).attr('href');
      console.log(item);
    });

  } else {
    console.log("ERROR")
  }
});


//.replace(/\s\s+/g,'');
