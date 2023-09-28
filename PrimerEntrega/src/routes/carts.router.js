import {Router} from 'express'
import {cartsManager} from "../CartsManager.js"

const router = Router()

router.post('/', async(req, res) => {
    
    try {
        const newCart = await cartsManager.addCart()
        res.status(200).json({message: 'Cart created', cart: newCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.get('/:idCart',async(req,res)=> {
    const {idCart} = req.params
    try {
        const cart = await cartsManager.getcartById(+idCart)
        if (!cart) {
            return res.status(404).json({message: "No cart found" })
        }
        res.status(200).json({message: "Products found",cart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.post(':idCart/product/:idProduct',async(req,res)=>{
const {idCart, idProduct} = req.params
    try {
        const cart = await cartsManager.addProductCart(+idCart, +idProduct)
        if (!cart) {
            return res.status(404).json({message: "No cart found with this id" })
        }
        res.status(200).json({message: "Product found", cart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;