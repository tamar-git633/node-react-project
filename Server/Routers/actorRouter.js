const express= require("express")
const router=express.Router()
const actorController=require("../Controllers/actorController")

router.post("/rishum", actorController.rishum)
router.get("/rand", actorController.randNumbers)
router.post("/email", actorController.sendEmail)
module.exports=router;