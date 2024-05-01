import db from "../connect.js";

// Controller to handle fetching all materials
const getMaterial = (req, res) => {
    // Query to fetch all materials from the database
    const query = 'SELECT id, quantity,price, name, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM materials';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching material: ', err);
        res.status(500).json({ error: 'Error fetching material' });
        return;
      }
  
      // Send the material as JSON response
      res.json(results);
    });
};

// Controller to handle creating a new material 
const createMaterial = (req, res) => {
    const { name, price ,quantity } = req.body;
  
    // Validation
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
    }
  
    // Insert the new material into the database
    const query = 'INSERT INTO materials (name, price, quantity ) VALUES (?, ?, ?)';
    db.query(query, [name, price, quantity], (err, result) => {
      if (err) {
        console.error('Error creating material:', err);
        return res.status(500).json({ error: 'Error creating material.' });
      }
      // Return the newly created material
      const materialId = result.insertId;
      res.status(201).json({ id: materialId, name, price, quantity });
    });
};

// Controller to handle deleting a material
const deleteMaterial = (req, res) => {
    const materialId = req.params.id;

    // Query to delete a material by ID
    const query = 'DELETE FROM materials WHERE id = ?';

    // Execute the query
    db.query(query, [materialId], (err, result) => {
        if (err) {
            console.error('Error deleting material:', err);
            return res.status(500).json({ error: 'Error deleting material' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the material with the given ID doesn't exist
            return res.status(404).json({ error: 'material not found' });
        }

        res.status(200).json({ message: 'material deleted successfully' });
    });
};

const updateMaterial = (req, res) => {
  const materialId = req.params.id;
  const { name, price, quantity } = req.body;

  // Validation
  if (!name || !price || !quantity) {
      return res.status(400).json({ error: 'Please provide name, price and quantity.' });
  }

  // Update the material in the database
  const query = 'UPDATE materials SET name = ?, price = ?, quantity = ? WHERE id = ?';
  db.query(query, [name, price, quantity, materialId], (err, result) => {
      if (err) {
          console.error('Error updating material:', err);
          return res.status(500).json({ error: 'Error updating material.' });
      }

      if (result.affectedRows === 0) {
          // If no rows were affected, it means the material with the given ID doesn't exist
          return res.status(404).json({ error: 'material not found' });
      }

      res.status(200).json({ message: 'material updated successfully' });
  });
};

export { getMaterial, createMaterial, deleteMaterial, updateMaterial };

