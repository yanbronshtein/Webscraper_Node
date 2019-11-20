const request = require('request');
const cheerio = require('cheerio');
const pg = require('pg');
const { Client } = require('pg');

const DATABASE_URL = "postgres://heyqktlharsftd:5a837c4c93cd7888b905d1ef8c0539cef049edf940e4c222ddab89a19746bf68@ec2-107-22-253-158.compute-1.amazonaws.com:5432/dcdjp0rfq2vi8s";
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();


/*
* const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*
*
* */
const serverName = "ec2-107-22-253-158.compute-1.amazonaws.com";

const nameOfDatabase = "dcdjp0rfq2vi8s";

const userName = "heyqktlharsftd";
const port = "5432";

const password = "5a837c4c93cd7888b905d1ef8c0539cef049edf940e4c222ddab89a19746bf68";
const connectionString = `postgres://${userName}:${password}@${serverName}/${port}/${nameOfDatabase}`;
//
// const pgClient = new pg.Client("postgres://heyqktlharsftd:5a837c4c93cd7888b905d1ef8c0539cef049edf940e4c222ddab89a19746bf68@ec2-107-22-253-158.compute-1.amazonaws.com");
// pgClient.connect();


// var query = pgClient.query("SELECT id from Customer where name = 'customername'");

// postgres://heyqktlharsftd:5a837c4c93cd7888b905d1ef8c0539cef049edf940e4c222ddab89a19746bf68@ec2-107-22-253-158.compute-1.amazonaws.com:5432/dcdjp0rfq2vi8s


request('https://www.whitehouse.gov/', (error,response, html)=> {
  if (!error && response.statusCode === 200) {
    // const $ = cheerio.load(html);
    const $ = cheerio.load(html);

    /*From meta tags */
    const description = $('meta[name=description]').attr("content");
    const keywords = $('meta[name=keywords]').attr("content");

    /*From head */
    const headTitle = $('head title').text();




    // const description = $('meta[name=description]').attr("content");

    console.log(lastModified);
  } else {
    console.log("ERROR")
  }
});






