const path = require("path")
const { findUsers } = require("../users/users.service")
const { generateReport } = require("./excel.service")

const usersReport = async (req,res)=>{
    const users = findUsers()
    const reportPath =  await generateReport(users)
    const reportName = reportPath.split("/")[1]
    const passFilePath = path.resolve(reportPath);
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',);
    res.setHeader('Content-disposition', `attachment; filename=${reportName}`);
    res.sendFile(passFilePath);
}
 

module.exports = {
    usersReport
}