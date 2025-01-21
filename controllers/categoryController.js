import db from "../database/db.js";

const showCategory = async (req, res) => {
  try {
    const query = "SELECT * FROM categories";
    const [rows] = await db.execute(query);
    res.status(200).send({ message: "Categories retrieved", data: rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const showCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM categories WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ message: "Category retrieved", data: rows[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).send({ message: "Category name is required" });
  }
  try {
    const query = "INSERT INTO categories (categoryName) VALUES (?)";
    const [result] = await db.execute(query, [categoryName]);
    res.status(201).send({ message: "Category added", id: result.insertId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).send({ message: "Category name is required" });
  }
  try {
    const query = "UPDATE categories SET categoryName = ? WHERE id = ?";
    const [result] = await db.execute(query, [categoryName, id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ message: "Category updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM categories WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  addCategory,
  showCategory,
  showCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
