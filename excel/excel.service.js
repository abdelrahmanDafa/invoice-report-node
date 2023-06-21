const ExcelJS = require('exceljs');
const { genRandomName } = require('../utils/genRandom');

const generateReport = async(users)=>{
    const randomName = `reports/${genRandomName('excel.xlsx')}`
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('users');
    const sheet2 = workbook.addWorksheet('My Sheet');
    sheet.columns = [
         {  header:"ID",key:"id", width:10},
         {  header:"Name",key:"name", width:20},
         {  header:"Email",key:"email", width:30},
         {  header:"Username",key:"username", width:20},
    ]
     
    sheet.addRows(users)
    await workbook.xlsx.writeFile(randomName)
    console.log(`report created ${randomName}`);
    return randomName
}


module.exports = {
    generateReport
}