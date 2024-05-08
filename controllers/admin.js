import db from "../connect.js";

const getOrders = (req, res) => {
    // Query to fetch all employees

      const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name, admins.firstname AS admin_name, bailers.firstname AS bailer_name, customers.firstname AS customer_name FROM orders JOIN products ON orders.product_id = products.product_id LEFT JOIN admins ON orders.admin_id = admins.admin_id LEFT JOIN bailers ON orders.bailer_id = bailers.bailer_id LEFT JOIN customers ON orders.customer_id = customers.customer_id WHERE orders.status = "pending"';
 
      // Execute the query
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching orders: ', err);
          res.status(500).json({ error: 'Error fetching orders' });
          return;
        }
  
        res.json(results);
      });
  };

  const getAcceptedOrders = (req, res) => {
    // Query to fetch all employees

      const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name, admins.firstname AS admin_name, bailers.firstname AS bailer_name, customers.firstname AS customer_name FROM orders JOIN products ON orders.product_id = products.product_id LEFT JOIN admins ON orders.admin_id = admins.admin_id LEFT JOIN bailers ON orders.bailer_id = bailers.bailer_id LEFT JOIN customers ON orders.customer_id = customers.customer_id WHERE orders.status = "accept"';
 
      // Execute the query
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching orders: ', err);
          res.status(500).json({ error: 'Error fetching orders' });
          return;
        }
  
        res.json(results);
      });
  };

  const getCancelledOrders = (req, res) => {
    // Query to fetch all employees

      const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name, admins.firstname AS admin_name, bailers.firstname AS bailer_name, customers.firstname AS customer_name FROM orders JOIN products ON orders.product_id = products.product_id LEFT JOIN admins ON orders.admin_id = admins.admin_id LEFT JOIN bailers ON orders.bailer_id = bailers.bailer_id LEFT JOIN customers ON orders.customer_id = customers.customer_id WHERE orders.status = "cancelled"';
 
      // Execute the query
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching orders: ', err);
          res.status(500).json({ error: 'Error fetching orders' });
          return;
        }
  
        res.json(results);
      });
  };

  const getAdmin = (req, res) => {
    const user_id = req.params.id;
    // Query to fetch customer details for the given user ID
    const query = 'SELECT admin_id FROM admins WHERE user_id = ?';
  
    // Execute the query with the user ID as a parameter
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error('Error fetching admin: ', err);
        res.status(500).json({ error: 'Error fetching admin' });
        return;
      }
  
      // Check if customer details exist for the given user ID
      if (results.length === 0) {
        res.status(404).json({ error: 'Admin not found for the given user ID' });
        return;
      }
  
      // Send the customer details as a response
      res.json(results[0]); // Assuming there's only one customer for each user ID
    });
  };
  

export { getAdmin, getOrders, getAcceptedOrders, getCancelledOrders };