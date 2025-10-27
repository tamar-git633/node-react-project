const express=require("express")
const router=express.Router()
const AuthController=require("../Controllers/AuthController")
const verifyJWT = require("../MiddleWare/verifyJWT")

// router.get("/get", AuthController.getUser)
router.post("/register", AuthController.register)
// router.put("/put", AuthController.putUser)
router.post("/login", AuthController.logIn)//,verifyJWT
// router.delete("/delete", AuthController.deleteUser)

module.exports=router