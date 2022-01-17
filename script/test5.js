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
// start of the program
const getCricketWorldCupsList = async () => {
    const cricketWorldCupRawData = await getRawData(URL);

    // parsing the data
    const parsedCricketWorldCupData = cheerio.load(cricketWorldCupRawData);

    // extracting the table data
    const worldCupsDataTable = parsedCricketWorldCupData("div.text-block");

    console.log(worldCupsDataTable);
    worldCupsDataTable.forEach((row) => {
    if (worldCupsDataTable.name === "p") {
        console.log("Innnnnnnn");

        const columns = row.children.filter((column) => column.name === "td");
        // extracting year
        const yearColumn = columns[0];
    }
    });
};

// invoking the main function
getCricketWorldCupsList();
