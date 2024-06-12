import db from "../connect.js";

const getDriver = (req, res) => {
    const user_id = req.params.id;

    const query = 'SELECT * FROM drivers WHERE user_id = ?';
  
    // Execute the query with the user ID as a parameter
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error('Error fetching driver: ', err);
        res.status(500).json({ error: 'Error fetching driver' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Driver not found for the given user ID' });
        return;
      }
  
      res.json(results[0]);
    });
  };

  const getBin = (req, res) => {
    // Query to fetch all bins from the database
    const query = 'SELECT bins.bin_id, bins.total_quantity, bins.bin_name, bins.address, admins.firstname AS admin_name, bin_types.type_name, DATE_FORMAT(bins.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bins.updated_at, "%Y-%m-%d") AS updated_at FROM bins LEFT JOIN admins ON bins.admin_id = admins.admin_id LEFT JOIN bin_types ON bins.type_id = bin_types.type_id';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching bin: ', err);
        res.status(500).json({ error: 'Error fetching bin' });
        return;
      }
  
      // Send the bin as JSON response
      res.json(results);
    });
};

const getDriverCollection =  (req, res) => {
  const collection_id = req.params.id;
  
  const query = 'SELECT driver_collections.collection_id, driver_collections.name AS collection_name, driver_collections.quantity, DATE_FORMAT(driver_collections.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(driver_collections.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at,driver_collections.status, drivers.firstname AS driver_name, bins.bin_name, materials.name AS material_name FROM driver_collections LEFT JOIN drivers ON drivers.driver_id = driver_collections.driver_id LEFT JOIN bins ON bins.bin_id = driver_collections.bin_id LEFT JOIN materials ON materials.material_id = driver_collections.material_id WHERE driver_collections.driver_id = ?';

  db.query(query, [collection_id], (err, result) => {
      if (err) {
          console.error('Error fetching collection:', err);
          res.status(500).json({ error: 'Error fetching collection' });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Collection not found' });
          return;
      }
      res.json(result);
  });
};

const getUserId = (req, res) => {
  const driver_id = req.params.id;

  const query = 'SELECT * FROM drivers WHERE driver_id = ?';

  // Execute the query with the user ID as a parameter
  db.query(query, [driver_id], (err, results) => {
    if (err) {
      console.error('Error fetching user: ', err);
      res.status(500).json({ error: 'Error fetching user' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found for the given driver Id' });
      return;
    }

    res.json(results[0]);
  });
};



const updateAbout = (req, res) => {
  const driver_id = req.params.id;
  const { about } = req.body;
  const query = 'UPDATE drivers SET about =? WHERE user_id = ?';
  db.query(query, [about, driver_id], (err, result) => {
      if (err) {
          console.error('Error updating about:', err);
          res.status(500).json({ error: 'Error updating about' });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Driver not found' });
          return;
      }
      res.status(200).json({ message: 'About updated successfully' });
  });
};
const updateDetails = (req, res) => {
  const supplier_id = req.params.id;
  const { firstname, lastname, address, telephone, nic } = req.body;

  const query = `
    UPDATE drivers 
    SET firstname = ?, lastname = ?, address = ?, telephone = ?, nic = ? 
    WHERE driver_id = ?
  `;

  db.query(query, [firstname, lastname, address, telephone, nic, supplier_id], (err, result) => {
    if (err) {
      console.error('Error updating driver details:', err);
      res.status(500).json({ error: 'Error updating driver details' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Driver not found' });
      return;
    }
    res.status(200).json({ message: 'Driver details updated successfully' });
  });
};

const getSalary = (req, res) => {

  const driver_id = req.params.id;

  const query = 'SELECT salary.salary_id, admins.firstname AS admin_name, salary.basic_salary, salary.epf, salary.bonus, salary.full_payment, salary.total_quantity, salary.target_bonus, salary.status, DATE_FORMAT(salary.created_at, "%Y-%m-%d") AS created_at, salary.unit_target_bonus, salary.monthly_target FROM salary LEFT JOIN admins ON admins.admin_id = salary.admin_id WHERE employee_id  = ?';

  // Execute the query with the user ID as a parameter
  db.query(query, [driver_id], (err, results) => {
    if (err) {
      console.error('Error fetching driver: ', err);
      res.status(500).json({ error: 'Error fetching driver' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Driver not found for the given user ID' });
      return;
    }

    res.json(results);
  });
};
  
export { getDriver, getBin, getDriverCollection, getUserId, updateAbout, updateDetails, getSalary };