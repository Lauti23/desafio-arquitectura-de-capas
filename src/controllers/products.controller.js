import { productService } from "../services/services.config.js"

const render = (req, res) => {
    res.render("products.hbs")
}

const renderSell = (req, res) => {
    res.render("sell.hbs")
}

const postProduct = async (req, res) => {
    const product = {
        name: req.body.product_name,
        price: req.body.product_price,
        image: req.body.product_image,
        stock: req.body.product_stock
    }
    productService.save(product)
    res.send("received")
}

export default {
    render,
    renderSell,
    postProduct
}