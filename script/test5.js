const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

// function to get the raw data
const getRawData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        });
};

// URL for data
const URL = "https://www.bbc.com/news/world-australia-60014059";
console.log("###############################################################################################");
// start of the program
const getCricketWorldCupsList = async () => {
    const cricketWorldCupRawData = await getRawData(URL);

    // parsing the data
    const parsedCricketWorldCupData = cheerio.load(cricketWorldCupRawData);

    // extracting the table data
    const worldCupsDataTable = parsedCricketWorldCupData("div.text-block");

    console.log(worldCupsDataTable);
    //worldCupsDataTable.forEach((row) => {
        console.log("fff");
        if (worldCupsDataTable.name === "p") {
            console.log("Innnnnnnn");

            // const columns = row.children.filter((column) => column.name === "td");
            // // extracting year
            // const yearColumn = columns[0];
        }
    //});
};

// invoking the main function
getCricketWorldCupsList();
{/* <div data-component="text-block" class="ssrcss-uf6wea-RichTextComponentWrapper e1xue1i85"><div class="ssrcss-17j9f6r-RichTextContainer e5tfeyi1"><p class="ssrcss-1q0x1qg-Paragraph eq5iqo00"><b class="ssrcss-hmf8ql-BoldText e5tfeyi3">Novak Djokovic has been deported from Australia after losing a last-ditch court bid to stay in the country. </b></p></div></div> */ }