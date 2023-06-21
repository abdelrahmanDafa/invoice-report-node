const path = require('path')
const dotenv = require('dotenv')
const express = require('express');
const excelRouter = require('./excel/excel.router');
const invoiceRouter = require('./invoice/invoice.router');
const { generateReport } = require('./shared/report.controller');


// Load environment-specific variables based on NODE_ENV
const currentEnv = process.env.NODE_ENV || 'development'
const envPath = path.resolve(__dirname, `env/.env.${currentEnv}`);
dotenv.config({ path: envPath });
const port = process.env.PORT|| 5050

const app = express()
app.use("/public",express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send({message:"app running successfuly"})
})
app.use('/excel',excelRouter)
app.use('/invoices',invoiceRouter)

// global report
app.get('/generate-report/:reportType',generateReport)

app.listen(port,()=>{
    console.log(`app working on port ${port} and env ${currentEnv}`);
})

