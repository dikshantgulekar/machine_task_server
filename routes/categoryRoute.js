import express from 'express'
import { addCategory, deleteCategoryById, showCategory, showCategoryById, updateCategoryById } from '../controllers/categoryController.js';

const categoryRoute = express.Router()

categoryRoute
.get('/show-category', showCategory)
.get('/show-category/:catId', showCategoryById)
.post('/add-category', addCategory)
.put('/update-category/:catId', updateCategoryById)
.delete('/delete-category/:catId', deleteCategoryById)

export default categoryRoute;