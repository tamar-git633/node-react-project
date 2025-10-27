const express=require("express")
const router=express.Router()
const userAuther=require("../Controllers/AuthController")


router.get("/get", userAuther.getUser)
router.post("/register", userAuther.register)
router.put("/put", userAuther.putUser)
router.get("/login", userAuther.logIn)
router.delete("/delete", userAuther.deleteUser)

module.exports=router