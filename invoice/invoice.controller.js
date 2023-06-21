const path = require("path")
const {  generateInvoice } = require("./invoice.service")

const orderInvoice = async (req,res)=>{
    const {orderId} = req.params;
    // add app middleware to set default  accept-language
    //const acceptLanguage = req.headers['accept-language'];
    try {
        const invoicePath =  await generateInvoice(orderId)
        const invoicePathParts = invoicePath.split('/')
        const displayFileName = invoicePathParts[invoicePathParts.length-1]
    
        const FilePath = path.resolve(invoicePath);
        res.setHeader('Content-disposition', `attachment; filename=${displayFileName}`);
        res.sendFile(FilePath);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
 

module.exports = {
    orderInvoice
}