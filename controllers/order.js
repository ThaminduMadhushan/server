import db from "../connect.js";

// Controller to handle fetching all orders
const getOrder = (req, res) => {
    // Query to fetch all orders from the database
    const query = 'SELECT * FROM orders';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching order: ', err);
        res.status(500).json({ error: 'Error fetching order' });
        return;
      }
  
      // Send the order as JSON response
      res.json(results);
    });
};

// Controller to handle creating a new order
const createOrder = (req, res) => {
    const { name,material , quantity } = req.body;
  
    // Validation
    if (!name || !material || !quantity) {
      return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
    }
  
    // Insert the new order into the database
    const query = 'INSERT INTO orders (name, material, quantity, status) VALUES (?, ?, ?, "pending")';
    db.query(query, [name, material, quantity,], (err, result) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Error creating order.' });
      }
      // Return the newly created order
      const orderId = result.insertId;
      res.status(201).json({ id: orderId, name, material, quantity });
    });
};

// Controller to handle deleting a order
const deleteOrder = (req, res) => {
    const orderId = req.params.id;

    // Query to delete a order by ID
    const query = 'DELETE FROM orders WHERE id = ?';

    // Execute the query
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err);
            return res.status(500).json({ error: 'Error deleting order' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the order with the given ID doesn't exist
            return res.status(404).json({ error: 'order not found' });
        }

        res.status(200).json({ message: 'order deleted successfully' });
    });
};

const updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { name, material, quantity } = req.body;

  // Validation
  if (!name || !material || !quantity) {
      return res.status(400).json({ error: 'Please provide name, material, and quantity.' });
  }

  // Update the order in the database
  const query = 'UPDATE orders SET name = ?, material = ?, quantity = ? WHERE id = ?';
  db.query(query, [name, material, quantity, orderId], (err, result) => {
      if (err) {
          console.error('Error updating order:', err);
          return res.status(500).json({ error: 'Error updating order.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the order with the given ID doesn't exist
          return res.status(404).json({ error: 'order not found' });
      }

      res.status(200).json({ message: 'order updated successfully' });
  });
};

export { getOrder, createOrder, deleteOrder, updateOrder };

