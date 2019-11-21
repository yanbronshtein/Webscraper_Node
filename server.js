const request = require('request');
const cheerio = require('cheerio');
const dateFormat = require('dateformat');
const fs = require('fs');






const {Client} = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

/* Attributes for page table */
let url = "";
let title = "";
let description = "";
//todo: Figure out how to specify Date type in javascript
let lastModified = new Date();
let lastIndexed = new Date();
//todo: Figure out how to specify time data type
let timeToIndex = new Date();


/* Attributes for word table */
let wordName= "";

/* Attributes for page_word table */

let keywords = "";

/*Attributes for search table */
let terms = "";
let count = 0;
let searchDate = new Date();
let timeToSearch = new Date();



//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const cors = require('cors');
//dotenv: load environment variables form a .env file
require('dotenv').config();

// middleware
app.use(cors());
//allow us to parse json
app.use(express.json());

// https://stackoverflow.com/questions/35633829/node-js-error-process-env-node-tls-reject-unauthorized-what-does-this-mean
// disable Node from rejecting self-signed certificates by allowing ANY unauthorised certificate.
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// Do not hard code your username and password.
// Consider using Node environment variables.
//password stored as environment variable.
const PS = process.env.PS;

const config = {
  user: "heyqktlharsftd",
  password: PS,
  host: "ec2-107-22-253-158.compute-1.amazonaws.com",
  post: 5432,
  database: "dcdjp0rfq2vi8s",
  ssl: true
};
const client = new Client(config);

app.listen(port, () => console.log(`Server is running on port ${port}`));

client.connect(err => {
  if (err) throw err;
  else {
    queryDatabase();
  }
});

function queryDatabase() {

  // const insert = `
  //       INSERT INTO page (title) VALUES ("${headTitle}");
  //       INSERT INTO page (description) VALUES ("${headTitle}");
  //       INSERT INTO word (wordname) VALUES ("${keywords}");
  //
  //   `;
  console.log("Head title"+ title);
  // const insert = `INSERT INTO page (title) VALUES ('${title}');`;
  const currDate = new Date(Date.now());

  const currDay = currDate.getDate();
  // const currDay =
  const insert = `INSERT INTO search (searchDate) VALUES ('${dateFormat()}');`;

  const select = 'SELECT * FROM search;';



  client
    .query(insert)
    .then(() => {
      console.log('Table created successfully!');
      client.end(console.log('Closed client connection'));
    })
    .catch(err => console.log(err))
    .then(() => {
      console.log('Finished execution, exiting now');
      process.exit();
    });
}


request('https://www.whitehouse.gov/', (error,response, html)=> {
  if (!error && response.statusCode === 200) {
    // const $ = cheerio.load(html);
    const $ = cheerio.load(html);

    /*From meta tags */
    description = $('meta[name=description]').attr("content");
    keywords = $('meta[name=keywords]').attr("content");

    /*From head */
    title = $('head title').text();
    console.log("File updated" + getFileUpdatedDate('https://www.whitehouse.gov/'));


    console.log(description);
  } else {
    console.log("ERROR")
  }
});


const getFileUpdatedDate = (url) => {
  const stats = fs.statSync(url);
  return stats.mtime
};


// function getSourceAsDOM(url)
// {
//   let xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET",url,false);
//   xmlhttp.send();
//   parser=new DOMParser();
//   return parser.parseFromString(xmlhttp.responseText,"text/html");
// }






