const path = require("path")
const { findUsers } = require("../users/users.service");
const {generateReportService} = require("./report.service")

const generateReport =async(req,res)=>{
    const {reportType} = req.params || 'pdf'  ;
    const users = findUsers();
    const reportsPath =  await generateReportService(users)
    const reportPath =  reportsPath[reportType]
    console.log("reportPath",reportPath,reportType);
    const reportName = reportPath.split("/")[1]
    const passFilePath = path.resolve(reportPath);
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',);
    res.setHeader('Content-disposition', `attachment; filename=${reportName}`);
    res.sendFile(passFilePath);
}

module.exports = {
    generateReport
}