const web_driver = require('selenium-webdriver');
const Promise = require('bluebird');
const chrome = require('selenium-webdriver/chrome');
const { By } = require('selenium-webdriver');
const reader = require('xlsx');
const selenium = require('selenium-webdriver');

/* 
   Add data,
   Read data,
   edit data
   from xlsx file.
*/

// Reading our test file if not exists otherwise create one
let file = '';
let initialArray = [];
const fileName = './bbcTest.xlsx';

try {
    file = reader.readFile(fileName);
} catch (error) {
    const wsDefault = reader.utils.json_to_sheet(initialArray);
    const wb = reader.utils.book_new();
    reader.utils.book_append_sheet(wb, wsDefault, "Sheet0");
    reader.writeFile(wb, fileName);
    file = reader.readFile(fileName);
}


const sheets = file.SheetNames;
let data = [];

function allSheetData() {
    // read and push all data from all sheets into an array
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        temp.forEach((res) => {
            data.push(res)
        });
    }
    // Printing data
    console.log(data);
}

function readSheetData() {
    // read from a particular sheet "file.SheetNames[0]"
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
    temp.forEach((res) => {
        data.push(res)
    });

    // Printing all data from sheet 0
    console.log(data);

    // Printing all data from row 1
    console.log(data[0]);

    // Printing the Student column value from first row
    console.log(data[0].Student);
}

function addNewRowData() {
    let student_data = [{
        Student: 'Galib',
        Age: 12,
        Branch: 'CSE',
        Marks: 40
    },
    {
        Student: 'Jisan',
        Age: 29,
        Branch: 'POP',
        Marks: 50
    }];

    const cellRef = reader.utils.encode_cell({ c: 0, r: 2 });
    // 'reader.utils.sheet_add_json' takes an array of objects and updates an existing worksheet object.
    reader.utils.sheet_add_json(file.Sheets[file.SheetNames[0]], student_data, { origin: cellRef });
    // Writing to our file
    reader.writeFile(file, fileName);

    // const sheet = file.Sheets[file.SheetNames[0]];
    // const cellRef = reader.utils.encode_cell({ c: 0, r: 3 });
    // const cell = sheet[cellRef];
    // if (cell) {
    //     // update existing cell
    //     cell.v = 'Name Edited in existing column';
    // } else {
    //     // add new cell
    //     reader.utils.sheet_add_aoa(sheet, [['Name Added in new column']], { origin: cellRef });
    // }
    // reader.writeFile(file, fileName);
}

// allSheetData();
// readSheetData();
addNewRowData();