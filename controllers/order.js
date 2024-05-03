import db from "../connect.js";

// Controller to handle fetching all orders
const getOrder = (req, res) => {
    // Query to fetch all orders from the database
    // const query = 'SELECT * FROM orders';
    const query = 'SELECT id, material, quantity,price, name, status, username,  DATE_FORMAT(date, "%Y-%m-%d") AS date FROM orders';
  
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
    const { name, material , quantity, price, username  } = req.body;
  
    // Validation
    if (!name || !material || !quantity || !price || !username) {
      return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
    }
  
    // Insert the new order into the database
    const query = 'INSERT INTO orders (name, material, quantity, price,username, status ) VALUES (?, ?, ?, ?, ?, "pending")';
    db.query(query, [name, material, quantity, price, username], (err, result) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Error creating order.' });
      }
      // Return the newly created order
      const orderId = result.insertId;
      res.status(201).json({ id: orderId, name, material, quantity, price, username });
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
  const { name, material, quantity, price } = req.body;

  // Validation
  if (!name || !material || !quantity || !price) {
      return res.status(400).json({ error: 'Please provide name, material, price and quantity.' });
  }

  // Update the order in the database
  const query = 'UPDATE orders SET name = ?, material = ?, quantity = ?, price = ? WHERE id = ?';
  db.query(query, [name, material, quantity,price, orderId], (err, result) => {
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

const acceptOrder = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  // Update the order in the database
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(query, [`accept`, orderId], (err, result) => {
      if (err) {
          console.error('Error accept order:', err);
          return res.status(500).json({ error: 'Error accepting order.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the order with the given ID doesn't exist
          return res.status(404).json({ error: 'order not found' });
      }

      res.status(200).json({ message: 'order accepted successfully' });
  });
};

export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder };

