import express from 'express';
import {
  addProduct,
  deleteProductById,
  showProductById,
  showProducts,
  updateProductById,
} from '../controllers/productController.js';

const productRoute = express.Router();

productRoute
  .get('/products', showProducts) 
  .get('/products/:productId', showProductById) 
  .post('/products', addProduct) 
  .put('/products/:productId', updateProductById) 
  .delete('/products/:productId', deleteProductById); 

export default productRoute;
