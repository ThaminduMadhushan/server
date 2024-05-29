import db from "../connect.js";

const getCustomer = (req, res) => {
  const user_id = req.params.id;
  // Query to fetch customer details for the given user ID
  const query = 'SELECT * FROM customers WHERE user_id = ?';

  // Execute the query with the user ID as a parameter
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching customer: ', err);
      res.status(500).json({ error: 'Error fetching customer' });
      return;
    }

    // Check if customer details exist for the given user ID
    if (results.length === 0) {
      res.status(404).json({ error: 'Customer not found for the given user ID' });
      return;
    }

    // Send the customer details as a response
    res.json(results[0]); // Assuming there's only one customer for each user ID
  });
};

const getPendingOrder =  (req, res) => {
  const orderId = req.params.id;
  
  const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ? AND orders.status = "pending"';

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Error fetching order:', err);
          res.status(500).json({ error: 'Error fetching order' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Order not found' });
          return;
      }
      res.json(result);
  });
};

const getAcceptedOrder =  (req, res) => {
  const orderId = req.params.id;
  
  const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ? AND orders.status = "accept"';

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Error fetching order:', err);
          res.status(500).json({ error: 'Error fetching order' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Order not found' });
          return;
      }
      res.json(result);
  });
};

const getCancelledOrder =  (req, res) => {
  const orderId = req.params.id;
  
  const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ? AND orders.status = "cancelled"';

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Error fetching order:', err);
          res.status(500).json({ error: 'Error fetching order' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Order not found' });
          return;
      }
      res.json(result);
  });
};

const getHomeAcceptedOrder =  (req, res) => {
  const orderId = req.params.id;
  
  const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ? AND orders.status = "accept" AND orders.notification_seen = "no"';

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Error fetching order:', err);
          res.status(500).json({ error: 'Error fetching order' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Order not found' });
          return;
      }
      res.json(result);
  });
};

const getHomeCancelledOrder =  (req, res) => {
  const orderId = req.params.id;
  
  const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ? AND orders.status = "cancelled" AND orders.notification_seen = "no"';

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Error fetching order:', err);
          res.status(500).json({ error: 'Error fetching order' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Order not found' });
          return;
      }
      res.json(result);
  });
};

const updateOrderSeen = (req, res) => {
  const orderIds = req.body.orderIds; // Expecting an array of order IDs

  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    return res.status(400).json({ error: 'Invalid order IDs' });
  }

  const query = 'UPDATE orders SET notification_seen = "yes" WHERE order_id IN (?)';

  db.query(query, [orderIds], (err, result) => {
    if (err) {
      console.error('Error updating orders:', err);
      res.status(500).json({ error: 'Error updating orders' });
      return;
    }
    res.json({ message: 'Orders updated successfully' });
  });
};

const updateAbout = (req, res) => {
  const customer_id = req.params.id;
  const { about } = req.body;
  const query = 'UPDATE customers SET about =? WHERE user_id = ?';
  db.query(query, [about, customer_id], (err, result) => {
      if (err) {
          console.error('Error updating about:', err);
          res.status(500).json({ error: 'Error updating about' });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Customer not found' });
          return;
      }
      res.status(200).json({ message: 'About updated successfully' });
  });
};

const updateDetails = (req, res) => {
  const customer_id = req.params.id;
  const { firstName, lastName, address, telephone, nic } = req.body;

  const query = `
    UPDATE customers 
    SET firstname = ?, lastname = ?, address = ?, telephone = ?, nic = ? 
    WHERE user_id = ?
  `;

  db.query(query, [firstName, lastName, address, telephone, nic, customer_id], (err, result) => {
    if (err) {
      console.error('Error updating customer details:', err);
      res.status(500).json({ error: 'Error updating customer details' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.status(200).json({ message: 'Customer details updated successfully' });
  });
};


export { getCustomer, getPendingOrder, getAcceptedOrder, getCancelledOrder, getHomeAcceptedOrder, getHomeCancelledOrder, updateOrderSeen, updateAbout, updateDetails };
