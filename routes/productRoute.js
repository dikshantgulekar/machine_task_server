import express from 'express'
import { addProduct, deleteProductById,  showProductById, showProducts, updateProductById } from '../controllers/productController.js';

const productRoute = express.Router()

productRoute
.get('/show-product', showProducts)
.get('/show-product/:productId', showProductById)
.post('/add-product', addProduct)
.put('/update-product/:productId', updateProductById)
.delete('/delete-product/:productId', deleteProductById)

export default productRoute;