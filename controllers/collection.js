import db from "../connect.js";

const createDriverCollection = (req, res) => {
    const { driverId, collectionName, binId, quantity, material_id } = req.body;
    const query = 'INSERT INTO driver_collections (driver_id, name, quantity, bin_id, material_id, status) VALUES (?, ?, ?, ?, ?, "pending")';
    db.query(query, [driverId, collectionName, quantity, binId, material_id], (err, result) => {
        if (err) {
            console.error('Error creating collection:', err);
            res.status(500).json({ error: 'Error creating collection'});
            return;
        }
        const collectionId = result.insertId;
        res.status(201).json({ id: collectionId, collectionName, binId, quantity, material_id });
    });
};

const getDriversCollection =  (req, res) => {

    const query = 'SELECT driver_collections.collection_id, driver_collections.driver_id, driver_collections.name AS collection_name, driver_collections.quantity, DATE_FORMAT(driver_collections.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(driver_collections.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, drivers.firstname AS driver_name, bins.bin_name, materials.name AS material_name FROM driver_collections LEFT JOIN drivers ON drivers.driver_id = driver_collections.driver_id LEFT JOIN bins ON bins.bin_id = driver_collections.bin_id LEFT JOIN materials ON materials.material_id = driver_collections.material_id';
  
    db.query(query, (err, result) => {
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
  
// const createCollection = (req, res) => {
//     const { admin_id, material_id, quantity, price, collector_id, collectionId } = req.body;
//     const query = 'INSERT INTO collections (admin_id, material_id, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)';
//     db.query(query, [admin_id, material_id, quantity, price, collector_id], (err, result) => {
//         if (err) {
//             console.error('Error creating collection:', err);
//             res.status(500).json({ error: 'Error creating collection' });
//             return;
//         }
//         const collectionId = result.insertId;
//         res.status(201).json({ id: collectionId, admin_id, material_id, quantity, price, collector_id });
//     });
// };

// const createCollection = (req, res) => {
//     const { admin_id, material_id, quantity, price, collector_id, collectionId } = req.body;
//     const query = 'INSERT INTO collections (admin_id, material_id, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)';
//     db.query(query, [admin_id, material_id, quantity, price, collector_id], (err, result) => {
//         if (err) {
//             console.error('Error creating collection:', err);
//             res.status(500).json({ error: 'Error creating collection' });
//             return;
//         }
          
//         const updateQuery = 'UPDATE driver_collections SET status = "accepted" WHERE collection_id = ?';
//         db.query(updateQuery, [collectionId], (updateErr, updateResult) => {
//             if (updateErr) {
//                 console.error('Error updating driver collection status:', updateErr);
//                 res.status(500).json({ error: 'Error updating driver collection status' });
//                 return;
//             } 
            
//             res.status(201).json({ id: collectionId, admin_id, material_id, quantity, price, collector_id });
//         });
//     });
// };
const createCollection = (req, res) => {
    const { admin_id, material_id, quantity, price, collector_id, collectionId } = req.body;
    const insertCollectionQuery = 'INSERT INTO collections (admin_id, material_id, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)';
  
    // Insert into collections
    db.query(insertCollectionQuery, [admin_id, material_id, quantity, price, collector_id], (err, result) => {
        if (err) {
            console.error('Error creating collection:', err);
            res.status(500).json({ error: 'Error creating collection' });
            return;
        }

        // Update driver_collections status
        const updateDriverCollectionQuery = 'UPDATE driver_collections SET status = "accepted" WHERE collection_id = ?';
        db.query(updateDriverCollectionQuery, [collectionId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating driver collection status:', updateErr);
                res.status(500).json({ error: 'Error updating driver collection status' });
                return;
            } 

            // Get bin_id from driver_collections
            const getBinIdQuery = 'SELECT bin_id FROM driver_collections WHERE collection_id = ?';
            db.query(getBinIdQuery, [collectionId], (binIdErr, binIdResult) => {
                if (binIdErr) {
                    console.error('Error fetching bin_id from driver collections:', binIdErr);
                    res.status(500).json({ error: 'Error fetching bin_id from driver collections' });
                    return;
                }

                const bin_id = binIdResult[0].bin_id;

                // Update bins table total_quantity
                const updateBinsQuery = 'UPDATE bins SET total_quantity = total_quantity + ? WHERE bin_id = ?';
                db.query(updateBinsQuery, [quantity, bin_id], (binUpdateErr, binUpdateResult) => {
                    if (binUpdateErr) {
                        console.error('Error updating bins total_quantity:', binUpdateErr);
                        res.status(500).json({ error: 'Error updating bins total_quantity' });
                        return;
                    }

                    // Update materials table total_quantity
                    const updateMaterialsQuery = 'UPDATE materials SET total_quantity = total_quantity + ? WHERE material_id = ?';
                    db.query(updateMaterialsQuery, [quantity, material_id], (materialUpdateErr, materialUpdateResult) => {
                        if (materialUpdateErr) {
                            console.error('Error updating materials total_quantity:', materialUpdateErr);
                            res.status(500).json({ error: 'Error updating materials total_quantity' });
                            return;
                        }

                        res.status(201).json({ id: collectionId, admin_id, material_id, quantity, price, collector_id });
                    });
                });
            });
        });
    });
};



const getSupplierCollection = (req, res) => {
    const query = `
        SELECT 
            supplier_collections.collection_id, 
            supplier_collections.supplier_id, 
            supplier_collections.quantity, 
            supplier_collections.price,
            DATE_FORMAT(supplier_collections.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, 
            DATE_FORMAT(supplier_collections.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, 
            suppliers.firstname AS supplier_name, 
            materials.name AS material_name 
        FROM 
            supplier_collections 
        LEFT JOIN 
            suppliers ON suppliers.supplier_id = supplier_collections.supplier_id 
        LEFT JOIN 
            materials ON materials.material_id = supplier_collections.material_id;
    `;

    db.query(query, (err, result) => {
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

const getCollection = (req, res) => {
    const query = `
        SELECT * FROM collections`;

    db.query(query, (err, result) => {
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


export { createDriverCollection, getDriversCollection, deleteDriverCollection, createCollection, getSupplierCollection, getCollection };