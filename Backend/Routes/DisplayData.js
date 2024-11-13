import express from 'express'
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.fooditems,global.foodcategory])
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        })
    }
})

export default router;