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

  const getCompletedOrders = (req, res) => {
    // Query to fetch all employees

      const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name, admins.firstname AS admin_name, bailers.firstname AS bailer_name, customers.firstname AS customer_name FROM orders JOIN products ON orders.product_id = products.product_id LEFT JOIN admins ON orders.admin_id = admins.admin_id LEFT JOIN bailers ON orders.bailer_id = bailers.bailer_id LEFT JOIN customers ON orders.customer_id = customers.customer_id WHERE orders.status = "completed"';
 
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

  const getFinishedOrders = (req, res) => {

      const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name, admins.firstname AS admin_name, bailers.firstname AS bailer_name, customers.firstname AS customer_name FROM orders JOIN products ON orders.product_id = products.product_id LEFT JOIN admins ON orders.admin_id = admins.admin_id LEFT JOIN bailers ON orders.bailer_id = bailers.bailer_id LEFT JOIN customers ON orders.customer_id = customers.customer_id WHERE orders.status = "finished"';
 
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

  const getBailingDetails = (req, res) => {
  
    const query = `
      SELECT 
        b.bailing_id, 
        bailers.firstname AS bailer_firstname,
        bailers.lastname AS bailer_lastname, 
        b.bailing_name, 
        materials.name AS material_name, 
        products.name AS product_name, 
        b.status, 
        admins.firstname AS admin_firstname,
        admins.lastname AS admin_lastname, 
        b.material_quantity, 
        b.product_quantity, 
        DATE_FORMAT(b.updated_at, "%Y-%m-%d") AS date 
      FROM 
        bailing_details b 
        JOIN bailers ON b.bailer_id = bailers.bailer_id 
        LEFT JOIN materials ON b.material_id = materials.material_id 
        LEFT JOIN products ON b.product_id = products.product_id 
        LEFT JOIN admins ON b.admin_id = admins.admin_id 
      WHERE 
        b.status = 'pending'`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching bailing details:', err);
        res.status(500).json({ error: 'Error fetching bailing details' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Bailing details not found" });
        return;
      }
  
      res.json(result);
    });
  };
  
  const getAcceptBailingDetails = (req, res) => {
  
    const query = `
      SELECT 
        b.bailing_id, 
        bailers.firstname AS bailer_firstname,
        bailers.lastname AS bailer_lastname, 
        b.bailing_name, 
        materials.name AS material_name, 
        products.name AS product_name, 
        b.status, 
        admins.firstname AS admin_firstname,
        admins.lastname AS admin_lastname, 
        b.material_quantity, 
        b.product_quantity, 
        DATE_FORMAT(b.updated_at, "%Y-%m-%d") AS date 
      FROM 
        bailing_details b 
        JOIN bailers ON b.bailer_id = bailers.bailer_id 
        LEFT JOIN materials ON b.material_id = materials.material_id 
        LEFT JOIN products ON b.product_id = products.product_id 
        LEFT JOIN admins ON b.admin_id = admins.admin_id 
      WHERE 
        b.status = 'accept'`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching bailing details:', err);
        res.status(500).json({ error: 'Error fetching bailing details' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Bailing details not found" });
        return;
      }
  
      res.json(result);
    });
  };

  const AcceptBailing = (req, res) => {

    const { bailing_id, admin_id, product_id, product_quantity, material_id, material_quantity } = req.body;
  
    const acceptBailingQuery = `
      UPDATE bailing_details 
      SET status = "accept", admin_id = ?, product_id = ?, product_quantity = ?, material_id = ?, material_quantity = ? 
      WHERE bailing_id = ?
    `;
  
    db.query(acceptBailingQuery, [admin_id, product_id, product_quantity, material_id, material_quantity, bailing_id], (err, result) => {
      if (err) {
        console.error('Error accepting bailing:', err);
        return res.status(500).json({ error: 'Error accepting bailing' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Bailing not found' });
      }
  
      const updateProductQuery = `
        UPDATE products 
        SET total_quantity = total_quantity + ? 
        WHERE product_id = ?
      `;
      
      db.query(updateProductQuery, [product_quantity, product_id], (updateProductErr) => {
        if (updateProductErr) {
          console.error('Error updating product stock:', updateProductErr);
          return res.status(500).json({ error: 'Error updating product stock' });
        }
  
        const updateMaterialQuery = `
          UPDATE materials 
          SET total_quantity = total_quantity - ? 
          WHERE material_id = ?
        `;
  
        db.query(updateMaterialQuery, [material_quantity, material_id], (updateMaterialErr) => {
          if (updateMaterialErr) {
            console.error('Error updating material stock:', updateMaterialErr);
            return res.status(500).json({ error: 'Error updating material stock' });
          }
  
          return res.status(200).json({ message: 'Bailing accepted successfully' });
        });
      });
    });
  };

export { getAdmin, getOrders, getAcceptedOrders, getCancelledOrders, getBailingDetails, getAcceptBailingDetails, AcceptBailing, getCompletedOrders, getFinishedOrders };