import express from "express";
import {
  addCategory,
  deleteCategoryById,
  showCategory,
  showCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const categoryRoute = express.Router();

categoryRoute
  .get("/categories", showCategory) // Fetch all categories
  .get("/categories/:id", showCategoryById) // Fetch category by ID
  .post("/categories", addCategory) // Add a new category
  .put("/categories/:id", updateCategoryById) // Update category by ID
  .delete("/categories/:id", deleteCategoryById); // Delete category by ID

export default categoryRoute;
