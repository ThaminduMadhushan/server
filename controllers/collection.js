import db from "../connect.js";

const createDriverCollection = (req, res) => {
    const { driverId, collectionName, binId, quantity, material_id } = req.body;
    const query = 'INSERT INTO driver_collections (driver_id, name, quantity, bin_id, material_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [driverId, collectionName, quantity, binId, material_id], (err, result) => {
        if (err) {
            console.error('Error creating collection:', err);
            res.status(500).json({ error: 'Error creating collection' });
            return;
        }
        const collectionId = result.insertId;
        res.status(201).json({ id: collectionId, collectionName, binId, quantity, material_id });
    });
};

const getDriversCollection =  (req, res) => {
    const collection_id = req.params.id;
    
    const query = 'SELECT driver_collections.collection_id, driver_collections.driver_id, driver_collections.name AS collection_name, driver_collections.quantity, DATE_FORMAT(driver_collections.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(driver_collections.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, drivers.firstname AS driver_name, bins.bin_name, materials.name AS material_name FROM driver_collections LEFT JOIN drivers ON drivers.driver_id = driver_collections.driver_id LEFT JOIN bins ON bins.bin_id = driver_collections.bin_id LEFT JOIN materials ON materials.material_id = driver_collections.material_id';
  
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
  

  const deleteDriverCollection = (req, res) => {
    const collectionId = req.params.id;

    // Query to delete a material by ID
    const query = 'DELETE FROM driver_collections WHERE collection_id = ?';

    // Execute the query
    db.query(query, [collectionId], (err, result) => {
        if (err) {
            console.error('Error deleting collection:', err);
            return res.status(500).json({ error: 'Error deleting collection' });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, it means the material with the given ID doesn't exist
            return res.status(404).json({ error: 'Collection not found' });
        }

        res.status(200).json({ message: 'collection deleted successfully' });
    });
};
  
const createCollection = (req, res) => {
    const { admin_id, material_id, quantity, price, collector_id } = req.body;
    const query = 'INSERT INTO collections (admin_id, material_id, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [admin_id, material_id, quantity, price, collector_id], (err, result) => {
        if (err) {
            console.error('Error creating collection:', err);
            res.status(500).json({ error: 'Error creating collection' });
            return;
        }
        const collectionId = result.insertId;
        res.status(201).json({ id: collectionId, admin_id, material_id, quantity, price, collector_id });
    });
};

export { createDriverCollection, getDriversCollection, deleteDriverCollection, createCollection };