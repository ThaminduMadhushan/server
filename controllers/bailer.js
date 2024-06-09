import db from "../connect.js";

const getBailer = (req, res) => {
  const user_id = req.params.id;

  const query = "SELECT * FROM bailers WHERE user_id = ?";

  // Execute the query with the user ID as a parameter
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching bailer: ", err);
      res.status(500).json({ error: "Error fetching bailer" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Bailer not found for the given user ID" });
      return;
    }

    res.json(results[0]);
  });
};

const getJobs = (req, res) => {
    const bailer_id = req.params.id;
  
    const query = "SELECT orders.order_id, products.name AS product_name, orders.name AS order_name, orders.quantity, DATE_FORMAT(orders.updated_at, '%Y-%m-%d ') AS accept_date FROM orders LEFT JOIN products ON orders.product_id = products.product_id WHERE orders.bailer_id = ? AND orders.status = 'accept'";
  
    // Execute the query with the user ID as a parameter
    db.query(query, [bailer_id], (err, results) => {
      if (err) {
        console.error("Error fetching bailer: ", err);
        res.status(500).json({ error: "Error fetching jobs" });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: "Jobs not found for the given bailer ID" });
        return;
      }
  
      res.json(results);
    });
  };

  const completeOrder = (req, res) => {
    const orderId = req.params.id;

    const query = 'UPDATE orders SET status = "completed" WHERE order_id = ?';
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error('Error completing order:', err);
            res.status(500).json({ error: 'Error completing order' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order completed successfully' });
    });
};

const getBailingDetails = (req, res) => {
  const bailer_id = req.params.id;

  const query = `
    SELECT 
      b.bailing_id, 
      bailers.firstname AS bailer_firstname,
      bailers.lastname AS bailer_lastname, 
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
      b.bailer_id = ? AND
      b.status = 'pending'`;

  db.query(query, [bailer_id], (err, result) => {
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
  const bailer_id = req.params.id;

  const query = `
    SELECT 
      b.bailing_id, 
      bailers.firstname AS bailer_firstname,
      bailers.lastname AS bailer_lastname, 
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
      b.bailer_id = ? AND
      b.status = 'accept'`;

  db.query(query, [bailer_id], (err, result) => {
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

const createBailing = (req, res) => {
  const {  bailer_id,  product_id, product_quantity, material_id, total_material_quantity } = req.body;

  // Insert the new material into the database
  const query = 'INSERT INTO bailing_details (bailer_id, product_id, product_quantity, material_id, material_quantity, status) VALUES (?, ?, ?, ?, ?, "pending")';
  db.query(query, [bailer_id, product_id, product_quantity, material_id, total_material_quantity], (err, result) => {
    if (err) {
      console.error('Error creating bailing:', err);
      return res.status(500).json({ error: 'Error creating bailing.' });
    }
    // Return the newly created material
    const bailingId = result.insertId;

    res.status(201).json({ id: bailingId, bailer_id, product_id, product_quantity, material_id, total_material_quantity });
  });
};

const updateBailing = (req, res) => {

  const bailing_id = req.params.id;

  const { product_id, product_quantity, material_id, total_material_quantity } = req.body;

  const query = 'UPDATE bailing_details SET product_id = ?, product_quantity =? , material_id = ?, material_quantity = ?, material_quantity WHERE bailing_id = ?';

  db.query(query, [ product_id, product_quantity, material_id, total_material_quantity, bailing_id], (err, result) => {
    if (err) {
      console.error('Error updating bailing:', err);
      return res.status(500).json({ error: 'Error updating bailing.' });
    }

    res.status(200).json({ message: 'Bailing updated successfully.' });
  });
};

const getSalary = (req, res) => {

  const bailer_id = req.params.id;

  const query = 'SELECT salary.salary_id, admins.firstname AS admin_name, salary.basic_salary, salary.epf, salary.bonus, salary.full_payment, salary.total_quantity, salary.target_bonus, salary.status, DATE_FORMAT(salary.created_at, "%Y-%m-%d") AS created_at, salary.unit_target_bonus, salary.monthly_target FROM salary LEFT JOIN admins ON admins.admin_id = salary.admin_id WHERE employee_id  = ?';

  // Execute the query with the user ID as a parameter
  db.query(query, [bailer_id], (err, results) => {
    if (err) {
      console.error('Error fetching bailer: ', err);
      res.status(500).json({ error: 'Error fetching bailer' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Bailer not found for the given user ID' });
      return;
    }

    res.json(results);
  });
};

const updateAbout = (req, res) => {
  const bailer_id = req.params.id;
  const { about } = req.body;
  const query = 'UPDATE bailers SET about =? WHERE user_id = ?';
  db.query(query, [about, bailer_id], (err, result) => {
      if (err) {
          console.error('Error updating about:', err);
          res.status(500).json({ error: 'Error updating about' });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Bailer not found' });
          return;
      }
      res.status(200).json({ message: 'About updated successfully' });
  });
};
const updateDetails = (req, res) => {
  const bailer_id = req.params.id;
  const { firstname, lastname, address, telephone, nic } = req.body;

  const query = `
    UPDATE bailers 
    SET firstname = ?, lastname = ?, address = ?, telephone = ?, nic = ? 
    WHERE bailer_id = ?
  `;

  db.query(query, [firstname, lastname, address, telephone, nic, bailer_id], (err, result) => {
    if (err) {
      console.error('Error updating bailer details:', err);
      res.status(500).json({ error: 'Error updating bailer details' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Bailer not found' });
      return;
    }
    res.status(200).json({ message: 'Bailer details updated successfully' });
  });
};

export { getBailer, getJobs, completeOrder, getBailingDetails, createBailing, getAcceptBailingDetails, updateBailing, getSalary, updateAbout, updateDetails };
