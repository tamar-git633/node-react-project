const express=require("express")
const router=express.Router()
const playerController=require("../Controllers/playerController")

router.post("/signup", playerController.signUp )
router.get("/game", playerController.game )
router.post("/log", playerController.log )

module.exports=router