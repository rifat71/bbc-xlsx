const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require('cheerio');


// URL for data
const URL = "https://www.bbc.com/";

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// start of the program
const getDetails = async () => {
   const detailsRawData = await getRawData(URL);
   console.log(detailsRawData);
};

// invoking the main function
getDetails();