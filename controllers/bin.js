import db from "../connect.js";

// Controller to handle fetching all bins
const getBin = (req, res) => {
    // Query to fetch all bins from the database
    const query = 'SELECT bins.bin_id, bins.total_quantity, bins.bin_name, bins.address, admins.firstname AS admin_name, bin_types.type_name, DATE_FORMAT(bins.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bins.updated_at, "%Y-%m-%d") AS updated_at FROM bins LEFT JOIN admins ON bins.admin_id = admins.admin_id LEFT JOIN bin_types ON bins.type_id = bin_types.type_id WHERE bins.status = "enable"';
  
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
const getDisableBin = (req, res) => {
  // Query to fetch all bins from the database
  const query = 'SELECT bins.bin_id, bins.total_quantity, bins.bin_name, bins.address, admins.firstname AS admin_name, bin_types.type_name, DATE_FORMAT(bins.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bins.updated_at, "%Y-%m-%d") AS updated_at FROM bins LEFT JOIN admins ON bins.admin_id = admins.admin_id LEFT JOIN bin_types ON bins.type_id = bin_types.type_id WHERE bins.status = "disable"';

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

// Controller to handle creating a new bin 
const createBin = (req, res) => {
    const { name, address, type_id, admin_id } = req.body;
  
    // Validation
    if (!name || !type_id || !address || !admin_id ) {
      return res.status(400).json({ error: 'Please provide name, address, admin and material type.' });
    }
  
    // Insert the new bin into the database
    const query = 'INSERT INTO bins (bin_name, address, admin_id, type_id, total_quantity) VALUES (?, ?, ?, ?, "0")';
    db.query(query, [name, address, admin_id, type_id], (err, result) => {
      if (err) {
        console.error('Error creating bin:', err);
        return res.status(500).json({ error: 'Error creating bin.' });
      }
      // Return the newly created bin
      const binId = result.insertId;

      res.status(201).json({ id: binId, name, address, type_id, total_quantity: 0 });
    });
};

// Controller to handle deleting a bin
const deleteBin = (req, res) => {
    const binId = req.params.id;

    // Query to delete a bin by ID
    const query = 'DELETE FROM bins WHERE bin_id = ?';

    // Execute the query
    db.query(query, [binId], (err, result) => {
        if (err) {
            console.error('Error deleting bin:', err);
            return res.status(500).json({ error: 'Error deleting bin' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the bin with the given ID doesn't exist
            return res.status(404).json({ error: 'bin not found' });
        }

        res.status(200).json({ message: 'bin deleted successfully' });
    });
};

const updateBin = (req, res) => {
  const binId = req.params.id;
  const { name, address, type_id, admin_id} = req.body;

  // Validation
  if (!name || !type_id || !address || !admin_id) {
      return res.status(400).json({ error: 'Please provide name, address, admin and material type.' });
  }

  // Update the bin in the database
  const query = 'UPDATE bins SET bin_name = ?, address = ?, type_id = ?, admin_id = ? WHERE bin_id = ?';
  db.query(query, [name, address, type_id, admin_id, binId], (err, result) => {
      if (err) {
          console.error('Error updating bin:', err);
          return res.status(500).json({ error: 'Error updating bin.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the bin with the given ID doesn't exist
          return res.status(404).json({ error: 'bin not found' });
      }

      res.status(200).json({ message: 'bin updated successfully' });
  });
};

const changeStatusEnableBin = (req, res) => {

  const bin_id = req.params.id;

  const query = 'UPDATE bins SET status = "enable" WHERE bin_id = ?';

  // Execute the query
  db.query(query, [bin_id], (err, result) => {
      if (err) {
          console.error('Error active product:', err);
          return res.status(500).json({ error: 'Error active bin' });
      } 

      if (result.affectedRows === 0) {

          // If no rows were affected, it means the product with the given ID doesn't exist
          return res.status(404).json({ error: 'bin not found' });
      }

      res.status(200).json({ message: 'bin activated successfully' });
  });
}

const changeStatusDisableBin = (req, res) => {

  const bin_id = req.params.id;

  const query = 'UPDATE bins SET status = "disable" WHERE bin_id = ?';

  // Execute the query
  db.query(query, [bin_id], (err, result) => {
      if (err) {
          console.error('Error disable product:', err);
          return res.status(500).json({ error: 'Error disable bin' });
      } 

      if (result.affectedRows === 0) {

          // If no rows were affected, it means the product with the given ID doesn't exist
          return res.status(404).json({ error: 'bin not found' });
      }

      res.status(200).json({ message: 'bin disabled successfully' });
  });
}

export { getBin, createBin, deleteBin, updateBin, getDisableBin, changeStatusDisableBin, changeStatusEnableBin };

