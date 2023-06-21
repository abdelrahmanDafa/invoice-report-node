// requires
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const { genRandomName } = require("../utils/genRandom");

const generateReport = async(users)=>{
    const randomName = `reports/${genRandomName('pdf.pdf')}`
    try {
           // init document
    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    // save document
    doc.pipe(fs.createWriteStream(randomName));

    ;(async function createTable(){
    // table
    const table = { 
        title: '',
        headers: [
            { label: "ID", property: 'id', width: 60 },
            { label: "Name", property: 'name', width: 80 },
            { label: "Email", property: 'email', width: 150 },
            { label: "Username", property: 'username', width: 80 }
        ],
        datas: users,
    };

    await doc.table(table, { 
        columnsSize: [ 50, 100, 200,100 ]
     });

    doc.end();
    })(); 
    } catch (error) {
        throw new Error('Failed to generate pdf report');
    }
   return randomName
}


module.exports = {
    generateReport
}