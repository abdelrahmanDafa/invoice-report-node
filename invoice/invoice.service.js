const ExcelJS = require('exceljs');
const { genRandomName } = require('../utils/genRandom');
const { findOneOrder } = require('../orders/orders.service');
const fs = require('fs')
const easyinvoice = require('easyinvoice');
// Invoice service
const generateInvoice = async (id) => {
    try {
      const order = await findOneOrder(id);
      const invoicePath = await privateGenerateInvoice(order.products);
      return invoicePath;
    } catch (error) {
      throw new Error('Failed to generate invoice');
    }
  };

// Generate invoice
const privateGenerateInvoice = (products) => {
    return new Promise((resolve, reject) => {
        var data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                // The invoice background
                "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "Sample Corp",
                "address": "Sample Street 123",
                "zip": "1234 AB",
                "city": "Sampletown",
                "country": "Samplecountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                "company": "Client Corp",
                "address": "Clientstreet 456",
                "zip": "4567 CD",
                "city": "Clientcity",
                "country": "Clientcountry"
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": "2021.0001",
                // Invoice data
                "date": "12-12-2021",
                // Invoice due date
                "due-date": "31-12-2021"
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            products,
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "Kindly pay your invoice within 15 days.",
            // Settings to customize your invoice
            "settings": {
                "currency": "EGP", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                 //"locale": "ar-EG", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency') 
                // "direction": 'rtl'      
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "1000px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
            // Translate your invoice to your preferred language
            "translate": {
                //"invoice": "فاتورة",  // Default to 'INVOICE'
                //"number": "رقم", // Defaults to 'Number'
                //"date": "التاريخ", // Default to 'Date'
                //"due-date": "تاريخ الصرف", // Defaults to 'Due Date'
                //"subtotal": "المجموع", // Defaults to 'Subtotal'
                //"products": "المنتجات", // Defaults to 'Products'
                //"quantity": "الكمية", // Default to 'Quantity'
                //"price": "السعر", // Defaults to 'Price'
                //"product-total": "المنتجات", // Defaults to 'Total'
                //"total": "السعر الكلي", // Defaults to 'Total'
                //"vat": "الضريبة" // Defaults to 'vat'
            },
        };
      easyinvoice.createInvoice(data, function (result) {
        const randomName = `reports/invoices/${genRandomName('invoice.pdf')}`;
        try {
          fs.writeFileSync(randomName, result.pdf, 'base64');
          console.log("invoice created");
          resolve(randomName); // Resolve the promise with the generated invoice path
        } catch (error) {
          reject(new Error('Failed to write invoice file'));
        }
      });
    });
  };


module.exports = {
    generateInvoice
}
