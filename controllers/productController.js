import db from "../database/db.js";

// Add a new product
const addProduct = async function (req, res) {
    const { productName, productPrice, productDesc, categoryId } = req.body;
    try {
        const query = "INSERT INTO products (productName, productPrice, productDesc, categoryId) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(query, [productName, productPrice, productDesc, categoryId]);
        res.status(201).send({ msg: "Product Added Successfully", productId: result.insertId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Show all products
const showProducts = async function (req, res) {
    try {
        const query = "SELECT * FROM products";
        const [rows] = await db.execute(query);
        res.send({ msg: "Showing all products", data: rows });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Show a product by ID
const showProductById = async function (req, res) {
    const { productId } = req.params;
    try {
        const query = "SELECT * FROM products WHERE id = ?";
        const [rows] = await db.execute(query, [productId]);
        if (rows.length === 0) {
            return res.status(404).send({ msg: "Product not found" });
        }
        res.send({ msg: "Showing product by ID", data: rows[0] });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update a product by ID
const updateProductById = async function (req, res) {
    const { productId } = req.params;
    const { productName, productPrice, productDesc, categoryId } = req.body;

    // Debugging: log the incoming data
    console.log("Received data:", req.body);

    // Check if any field is undefined
    if (!productName || !productPrice || !productDesc || !categoryId) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        const query = "UPDATE products SET  categoryId = ? ,productName = ?, productPrice = ?, productDesc = ? WHERE id = ?";
        const [result] = await db.execute(query, [categoryId,productName, productPrice, productDesc, productId]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ msg: "Product not found" });
        }

        res.send({ msg: "Product Updated Successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a product by ID
const deleteProductById = async function (req, res) {
    const { productId } = req.params;
    try {
        const query = "DELETE FROM products WHERE id = ?";
        const [result] = await db.execute(query, [productId]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ msg: "Product not found" });
        }
        res.send({ msg: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export {
    addProduct,
    showProducts,
    showProductById,
    updateProductById,
    deleteProductById
};
