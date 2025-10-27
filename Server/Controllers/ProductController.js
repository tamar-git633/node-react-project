const Product = require("../Models/Product")
const User = require("../Models/User")

const totalSum = (basket) => {
    let sum = 0
    for (let i = 0; i < basket.length; i++) {
        sum += basket[i].price
    }
    return sum
}

const addProduct = async (req, res) => {
    const { barcode, name, madeIn, designer, price, amount, isSale, percents, img, rating, category, quantity } = req.body
    if (!barcode || !name || (!madeIn && !designer) || !price || !amount)
        return res.status(400).send("all fields are required!")
    let newPrice = price
    if (!isSale && percents > 0)
        return res.send("The product is not in sale")
    else if (isSale && percents > 0)
        newPrice = price - ((price / 100) * percents)
    const duplicate = await Product.findOne({ barcode })
    if (duplicate)
        return res.status(409).send("duplicate barcode")
    const newProduct = {
        barcode,
        name,
        madeIn,
        designer,
        price: newPrice,
        amount,
        isSale,
        percents,
        img,
        rating,
        category,
        quantity
    }
    await Product.create(newProduct)
    res.json(newProduct)
}
const deleteProduct = async (req, res) => {
    const { barcode } = req.body
    const deleteProduct = await Product.findOne({ barcode })
    if (!deleteProduct)
        return res.status(404).send("Product is not found")
    await Product.deleteOne(deleteProduct)
    res.json({ message: "product is delete successfully", product: deleteProduct })
}
const updateProduct = async (req, res) => {
    const barcode = Number(req.params.barcode);
    const { name, price, amount, isSale, percents, img, category } = req.body
    if (!barcode)
        return res.status(400).send("barcode is required!")
    if (!isSale && percents > 0)
        return res.send("The product is not in sale")
    const updateProduct = await Product.findOne({ barcode })
    if (!updateProduct)
        return res.send("Product is not found!")
    if (price)
        updateProduct.price = price
    if (amount)
        updateProduct.amount = amount
    if (name)
        updateProduct.name = name
    if (isSale)
        updateProduct.isSale = isSale
    if (updateProduct.isSale == true)
        updateProduct.price = updateProduct.price - (percents * (updateProduct.price / 100))
    if (isSale == false)
        updateProduct.price = updateProduct.price + (updateProduct.percents * (updateProduct.price / 100))
    if (img)
        updateProduct.img = img
    if (category)
        updateProduct.category = category
    await updateProduct.save()
    res.json(updateProduct)
}
const addProdToBasket = async (req, res) => {
    const { barcode } = req.body
    if (!barcode)
        return res.status(400).send("Barcode is required!")
    const product = await Product.findOne({ barcode })
    if (!product)
        return res.send("Product is not found")
    const user = await User.findById(req.user._id)
    if (!user)
        return res.send("User is not found")
    const prod = user.basket.find((p) => {
        if (p.barcode == product.barcode) {
            p.quantity = p.quantity + 1
            p.price = p.price + product.price
            return p
        }
    })
    if (!prod)
        user.basket.push({ "name": product.name, "barcode": product.barcode, "amount": product.amount, "price": product.price, "category": product.category, "img": product.img })
    user.totalSum = totalSum(user.basket)
    await user.save()
    res.json({ basket: user.basket, totalSum: user.totalSum })
}
const deleteProdFromBasket = async (req, res) => {
    const { barcode } = req.body
    if (!barcode)
        return res.status(400).send("Barcode is required!")
    const user = await User.findById(req.user._id)
    if (!user)
        return res.send("User is not found")
    const index = user.basket.findIndex(p => p.barcode == barcode);
    if (index == -1)
        return res.status(404).send("Product not found")
    user.basket.splice(index, 1);
    user.totalSum = totalSum(user.basket)
    await user.save()
    res.json({ message: "Product is delete successfully", totalSum: user.totalSum })
}
const plusProd = async (req, res) => {
    const { barcode } = req.body
    if (!barcode)
        return res.status(400).send("Barcode is required!")
    const product = await Product.findOne({ barcode })
    if (!product)
        return res.send("Product is not found")
    const user = await User.findById(req.user._id)
    if (!user)
        return res.send("User is not found")
    const index = user.basket.findIndex(p => p.barcode == barcode);
    if (index == -1)
        return res.status(404).send("Product is not found")
    user.basket[index].quantity += 1
    user.basket[index].price += product.price
    user.totalSum = totalSum(user.basket)
    await user.save()
    res.json({ message: "product added successfully", totalSum: user.totalSum })
}
const minusProd = async (req, res) => {
    const { barcode } = req.body
    if (!barcode)
        return res.status(400).send("Barcode is required!")
    const product = await Product.findOne({ barcode })
    if (!product)
        return res.send("Product is not found")
    const user = await User.findById(req.user._id)
    if (!user)
        return res.send("User is not found")
    const index = user.basket.findIndex(p => p.barcode == barcode);
    if (index == -1)
        return res.status(404).send("Product is not found")
    user.basket[index].quantity -= 1
    user.basket[index].price -= product.price
    if (user.basket[index].quantity == 0)
        user.basket.splice(index, 1)
    user.basket.totalSum = totalSum(user.basket)
    await user.save()
    res.json({ message: "product reduced successfully", totalSum: user.totalSum })
}

const seeAll = async (req, res) => {
    const product = await Product.find()
    res.json(product)
}
const viewBasket = async (req, res) => {
    const userId = req.user._id
    const thisUser = await User.findById(userId)
    if (!thisUser)
        return res.status(404).send("user is not found")
    thisUser.totalSum = totalSum(thisUser.basket || []);
    await thisUser.save();
    return res.json({ basket: thisUser.basket || [], totalSum: thisUser.totalSum })
}
const deleteBasket = async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user)
        return res.status(404).send("user is not found")
    user.basket = []
    await user.save()
    user.totalSum = totalSum(user.basket)
    await user.save()
    return res.json({ basket: user.basket || [], totalSum: user.totalSum })
}

module.exports = { addProduct, deleteProduct, updateProduct, addProdToBasket, deleteProdFromBasket, plusProd, minusProd, seeAll, viewBasket, deleteBasket }
