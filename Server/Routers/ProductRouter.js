const express=require("express")
const Router=express.Router()
const ProductController=require("../Controllers/ProductController")
const AccessPermission=require("../MiddleWare/AccessPermission")
const verifyJWT=require("../MiddleWare/verifyJWT")

Router.post("/addproduct",AccessPermission,ProductController.addProduct)
Router.delete("/deleteproduct",AccessPermission,ProductController.deleteProduct)
Router.put("/updateproduct/:barcode",AccessPermission,ProductController.updateProduct)
Router.put("/addtobasket",verifyJWT,ProductController.addProdToBasket)
Router.delete("/deletefrombasket",verifyJWT,ProductController.deleteProdFromBasket)
Router.put("/plusproduct",verifyJWT,ProductController.plusProd)
Router.put("/minusproduct",verifyJWT,ProductController.minusProd)
Router.get("/seeall/:category",ProductController.seeAll)
Router.get("/seeall",ProductController.seeAll)
Router.get("/viewbasket",verifyJWT, ProductController.viewBasket)
Router.put("/deletebasket",verifyJWT, ProductController.deleteBasket)

module.exports=Router