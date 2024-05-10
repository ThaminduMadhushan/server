import db from "../connect.js";

// Controller to handle fetching all bins
const getBinType = (req, res) => {
    // Query to fetch all bins from the database
    const query = 'SELECT type_id, type_name, admin_id, DATE_FORMAT(created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d") AS updated_at FROM bin_types';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching bin types: ', err);
        res.status(500).json({ error: 'Error fetching bin types' });
        return;
      }
  
      // Send the binType as JSON response
      res.json(results);
    });
};

// Controller to handle creating a new binType 
const createBinType = (req, res) => {
    const { name, admin_id  } = req.body;
  
    // Validation
    if (!name || !admin_id ) {
      return res.status(400).json({ error: 'Please provide name and admin.' });
    }
  
    // Insert the new binType into the database
    const query = 'INSERT INTO bin_types (type_name, admin_id) VALUES (?, ?)';
    db.query(query, [name, admin_id], (err, result) => {
      if (err) {
        console.error('Error creating bin type:', err);
        return res.status(500).json({ error: 'Error creating bin type.' });
      }
      // Return the newly created bin
      const binId = result.insertId;

      res.status(201).json({ id: binId, name, admin_id });
    });
};

// Controller to handle deleting a bin
const deleteBinType = (req, res) => {
    const binId = req.params.id;

    // Query to delete a bin by ID
    const query = 'DELETE FROM bin_types WHERE type_id = ?';

    // Execute the query
    db.query(query, [binId], (err, result) => {
        if (err) {
            console.error('Error deleting bin type:', err);
            return res.status(500).json({ error: 'Error deleting bin type' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the bin with the given ID doesn't exist
            return res.status(404).json({ error: 'bin not found' });
        }

        res.status(200).json({ message: 'Bin type deleted successfully' });
    });
};

const updateBinType = (req, res) => {
  const binId = req.params.id;
  const { name, admin_id } = req.body;

  // Validation
  if (!name || !admin_id ) {
      return res.status(400).json({ error: 'Please provide name and admin.' });
  }

  // Update the bin in the database
  const query = 'UPDATE bin_types SET type_name = ?, admin_id = ? WHERE type_id = ?';
  db.query(query, [name, admin_id, binId], (err, result) => {
      if (err) {
          console.error('Error updating bin type:', err);
          return res.status(500).json({ error: 'Error updating bin type.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the bin with the given ID doesn't exist
          return res.status(404).json({ error: 'bin type not found' });
      }

      res.status(200).json({ message: 'bin type updated successfully' });
  });
};

export { getBinType, createBinType, deleteBinType, updateBinType };

