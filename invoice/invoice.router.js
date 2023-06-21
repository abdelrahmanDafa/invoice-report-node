const {Router} = require('express')
const { orderInvoice } = require('./invoice.controller')

const router = Router()

router.get('/',(req,res)=>{
    res.send({message:"working"})
    })


router.get('/order-invoice/:orderId',orderInvoice)


module.exports = router