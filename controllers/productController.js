import db from '../database/db.js';

const addProduct = async (req, res) => {
  const { productName, productPrice, productDesc, categoryId } = req.body;

  if (!productName || !productPrice || !productDesc || !categoryId) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const query =
      'INSERT INTO products (productName, productPrice, productDesc, categoryId) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      productName,
      productPrice,
      productDesc,
      categoryId,
    ]);
    res.status(201).send({
      msg: 'Product created successfully',
      productId: result.insertId,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const showProducts = async (req, res) => {
  try {
    const query = 'SELECT * FROM products';
    const [rows] = await db.execute(query);
    res.status(200).send({ msg: 'All products retrieved successfully', data: rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const showProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await db.execute(query, [productId]);

    if (rows.length === 0) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send({ msg: 'Product retrieved successfully', data: rows[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { productId } = req.params;
  const { productName, productPrice, productDesc, categoryId } = req.body;

  if (!productName || !productPrice || !productDesc || !categoryId) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const query =
      'UPDATE products SET categoryId = ?, productName = ?, productPrice = ?, productDesc = ? WHERE id = ?';
    const [result] = await db.execute(query, [
      categoryId,
      productName,
      productPrice,
      productDesc,
      productId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send({ msg: 'Product updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.execute(query, [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send({ msg: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  addProduct,
  showProducts,
  showProductById,
  updateProductById,
  deleteProductById,
};
