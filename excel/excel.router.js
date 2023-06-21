const {Router} = require('express')
const { usersReport } = require('./excel.controller')

const router = Router()

router.get('/',(req,res)=>{
    res.send({message:"working"})
    })


router.get('/users-report',usersReport)


module.exports = router