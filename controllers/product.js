// import db from "../connect.js";

// // Controller to handle fetching all products
// const getProducts = (req, res) => {
//     // Query to fetch all products from the database
//     const query = 'SELECT * FROM products';
  
//     // Execute the query
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching products: ', err);
//         res.status(500).json({ error: 'Error fetching products' });
//         return;
//       }
  
//       // Send the products as JSON response
//       res.json(results);
//     });
// };

// // Controller to handle creating a new product
// const createProduct = (req, res) => {
//     const { name, price, quantity } = req.body;
  
//     // Validation
//     if (!name || !price || !quantity) {
//       return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
//     }
  
//     // Insert the new product into the database
//     const query = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
//     db.query(query, [name, price, quantity], (err, result) => {
//       if (err) {
//         console.error('Error creating product:', err);
//         return res.status(500).json({ error: 'Error creating product.' });
//       }
//       // Return the newly created product
//       const productId = result.insertId;
//       res.status(201).json({ id: productId, name, price, quantity });
//     });
// };

// // Controller to handle deleting a product
// const deleteProduct = (req, res) => {
//     const productId = req.params.id;

//     // Query to delete a product by ID
//     const query = 'DELETE FROM products WHERE id = ?';

//     // Execute the query
//     db.query(query, [productId], (err, result) => {
//         if (err) {
//             console.error('Error deleting product:', err);
//             return res.status(500).json({ error: 'Error deleting product' });
//         }

//         if (result.affectedRows === 0) {
//             // If no rows were affected, it means the product with the given ID doesn't exist
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product deleted successfully' });
//     });
// };

// const updateProduct = (req, res) => {
//   const productId = req.params.id;
//   const { name, price, quantity } = req.body;

//   // Validation
//   if (!name || !price || !quantity) {
//       return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
//   }

//   // Update the product in the database
//   const query = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
//   db.query(query, [name, price, quantity, productId], (err, result) => {
//       if (err) {
//           console.error('Error updating product:', err);
//           return res.status(500).json({ error: 'Error updating product.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the product with the given ID doesn't exist
//           return res.status(404).json({ error: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product updated successfully' });
//   });
// };

// export { getProducts, createProduct, deleteProduct, updateProduct };


// import db from "../connect.js";

// // Controller to handle fetching all products
// const getProducts = (req, res) => {
//     // Query to fetch all products from the database
//     // const query = 'SELECT * FROM products';
//     const query = 'SELECT id, name, price, quantity, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM products';
  
//     // Execute the query
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching products: ', err);
//         res.status(500).json({ error: 'Error fetching products' });
//         return;
//       }
  
//       // Send the products as JSON response
//       res.json(results);
//     });
// };

// // Controller to handle creating a new product
// const createProduct = (req, res) => {
//     const { name, price } = req.body;
  
//     // Validation
//     if (!name || !price) {
//       return res.status(400).json({ error: 'Please provide name and price.' });
//     }
  
//     // Insert the new product into the database
//     const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
//     db.query(query, [name, price], (err, result) => {
//       if (err) {
//         console.error('Error creating product:', err);
//         return res.status(500).json({ error: 'Error creating product.' });
//       }
//       // Return the newly created product
//       const productId = result.insertId;
//       res.status(201).json({ id: productId, name, price });
//     });
// };

// // Controller to handle deleting a product
// const deleteProduct = (req, res) => {
//     const productId = req.params.id;

//     // Query to delete a product by ID
//     const query = 'DELETE FROM products WHERE id = ?';

//     // Execute the query
//     db.query(query, [productId], (err, result) => {
//         if (err) {
//             console.error('Error deleting product:', err);
//             return res.status(500).json({ error: 'Error deleting product' });
//         }

//         if (result.affectedRows === 0) {
//             // If no rows were affected, it means the product with the given ID doesn't exist
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product deleted successfully' });
//     });
// };

// const updateProduct = (req, res) => {
//   const productId = req.params.id;
//   const { name, price } = req.body;

//   // Validation
//   if (!name || !price ) {
//       return res.status(400).json({ error: 'Please provide name and price.' });
//   }

//   // Update the product in the database
//   const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
//   db.query(query, [name, price, productId], (err, result) => {
//       if (err) {
//           console.error('Error updating product:', err);
//           return res.status(500).json({ error: 'Error updating product.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the product with the given ID doesn't exist
//           return res.status(404).json({ error: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product updated successfully' });
//   });
// };

// export { getProducts, createProduct, deleteProduct, updateProduct };



import db from "../connect.js";

// Controller to handle fetching all products
const getProducts = (req, res) => {
    // Query to fetch all products from the database
    // const query = 'SELECT * FROM products';
    const query = 'SELECT product_id, name, unit_price, total_quantity, DATE_FORMAT(created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d") AS updated_at FROM products';
  
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
    const { name, unit_price } = req.body;
  
    // Validation
    if (!name || !unit_price ) {
      return res.status(400).json({ error: 'Please provide name and price.' });
    }
  
    // Insert the new product into the database
    const query = 'INSERT INTO products (name, unit_price) VALUES (?, ?)';
    db.query(query, [name, unit_price], (err, result) => {
      if (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ error: 'Error creating product.' });
      }
      // Return the newly created product
      const productId = result.insertId;
      res.status(201).json({ id: productId, name, unit_price });
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

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, unit_price } = req.body;

  // Validation
  if (!name || !unit_price ) {
      return res.status(400).json({ error: 'Please provide name and price.' });
  }

  // Update the product in the database
  const query = 'UPDATE products SET name = ?, unit_price = ? WHERE product_id = ?';
  db.query(query, [name, unit_price, productId], (err, result) => {
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

export { getProducts, createProduct, deleteProduct, updateProduct };

