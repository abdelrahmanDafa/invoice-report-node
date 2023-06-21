const excelReport = require("../excel/excel.service")
const pdfReport = require("../pdf/pdf.service")

const generateReportService = async(users)=>{
 const pdf = await pdfReport.generateReport(users)
 const excel = await excelReport.generateReport(users)
 return {
    pdf,
    excel
 }
}


module.exports = {
    generateReportService
}