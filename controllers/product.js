import db from "../connect.js";

// Controller to handle fetching all products
const getProducts = (req, res) => {
    // Query to fetch all products from the database
    // const query = 'SELECT * FROM products';
    const query = 'SELECT products.product_id, products.name AS product_name, products.unit_price, products.total_quantity, materials.name AS material_name, products.material_quantity, products.material_id FROM products LEFT JOIN materials ON products.material_id = materials.material_id WHERE products.status = "enable"';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching products: ', err);
        res.status(500).json({ error: 'Error fetching products' });
        return;
      }
  
      // Send the products as JSON response
      res.json(results);
    });
};

const getDisabledProducts = (req, res) => {
  // Query to fetch all products from the database
  // const query = 'SELECT * FROM products';
  const query = 'SELECT products.product_id, products.name AS product_name, products.unit_price, products.total_quantity, materials.name AS material_name, products.material_quantity, products.material_id FROM products LEFT JOIN materials ON products.material_id = materials.material_id WHERE products.status = "disable"';

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      res.status(500).json({ error: 'Error fetching products' });
      return;
    }

    // Send the products as JSON response
    res.json(results);
  });
};

// Controller to handle creating a new product
const createProduct = (req, res) => {
    const { name, unit_price, total_quantity, material_id, material_quantity } = req.body;
  
    // Validation
    if (!name || !unit_price || !total_quantity) {
      return res.status(400).json({ error: 'Please provide name and price.' });
    }
  
    // Insert the new product into the database
    const query = 'INSERT INTO products (name, unit_price, total_quantity, material_id, material_quantity, status) VALUES (?, ?, ?, ?, ?, "enable")';
    db.query(query, [name, unit_price, total_quantity, material_id, material_quantity], (err, result) => {
      if (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ error: 'Error creating product.' });
      }
      // Return the newly created product
      const productId = result.insertId;
      res.status(201).json({ id: productId, name, unit_price, total_quantity, material_id, material_quantity });
    });
};

// Controller to handle deleting a product
const deleteProduct = (req, res) => {
    const productId = req.params.id;

    // Query to delete a product by ID
    const query = 'DELETE FROM products WHERE product_id = ?';

    // Execute the query
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Error deleting product' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the product with the given ID doesn't exist
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    });
};

const changeStatusProduct = (req, res) => {

  const productId = req.params.id;

  // Query to delete a product by ID

  const query = 'UPDATE products SET status = "disable" WHERE product_id = ?';

  // Execute the query
  db.query(query, [productId], (err, result) => {
      if (err) {
          console.error('Error deleting product:', err);
          return res.status(500).json({ error: 'Error deleting product' });
      } 

      if (result.affectedRows === 0) {

          // If no rows were affected, it means the product with the given ID doesn't exist
          return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  });
}

const changeStatusDisableProduct = (req, res) => {

  const productId = req.params.id;

  // Query to delete a product by ID

  const query = 'UPDATE products SET status = "enable" WHERE product_id = ?';

  // Execute the query
  db.query(query, [productId], (err, result) => {
      if (err) {
          console.error('Error active product:', err);
          return res.status(500).json({ error: 'Error active product' });
      } 

      if (result.affectedRows === 0) {

          // If no rows were affected, it means the product with the given ID doesn't exist
          return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product activated successfully' });
  });
}

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { product_name, unit_price, total_quantity, material_id, material_quantity } = req.body;

  // Validation
  if (!product_name || !unit_price || !total_quantity || !material_id || !material_quantity) {
      return res.status(400).json({ error: 'Please provide name, price, quantity, material and material quantity.' });
  }

  // Update the product in the database
  const query = 'UPDATE products SET name = ?, unit_price = ? , total_quantity = ?, material_id = ?, material_quantity = ? WHERE product_id = ?';
  db.query(query, [product_name, unit_price, total_quantity, material_id, material_quantity, productId], (err, result) => {
      if (err) {
          console.error('Error updating product:', err);
          return res.status(500).json({ error: 'Error updating product.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the product with the given ID doesn't exist
          return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully' });
  });
};

export { getProducts, createProduct, deleteProduct, updateProduct, changeStatusProduct, getDisabledProducts, changeStatusDisableProduct };

