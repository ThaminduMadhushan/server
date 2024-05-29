import db from "../connect.js";

const getSupplier = (req, res) => {
  const user_id = req.params.id;

  const query = 'SELECT supplier_id FROM suppliers WHERE user_id = ?';

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching supplier: ', err);
      res.status(500).json({ error: 'Error fetching supplier' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Supplier not found for the given user ID' });
      return;
    }

    res.json(results[0]); 
  });
};

const createSupplierCollection = (req, res) => {
    const { supplierId, adminId, quantity, price, material_id, collectorId } = req.body;
  
    // First insert into supplier_collections
    const supplierCollectionQuery = 'INSERT INTO supplier_collections (supplier_id, admin_id, quantity, price, material_id) VALUES (?, ?, ?, ?, ?)';
    db.query(supplierCollectionQuery, [supplierId, adminId, quantity, price, material_id], (err, result) => {
      if (err) {
        console.error('Error creating supplier collection:', err);
        res.status(500).json({ error: 'Error creating supplier collection' });
        return;
      }
      
      const supplierCollectionId = result.insertId;
  
      // Then insert into collections
      const collectionQuery = 'INSERT INTO collections (admin_id, material_id, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)';
      db.query(collectionQuery, [adminId, material_id, quantity, price, collectorId], (err, result) => {
        if (err) {
          console.error('Error creating collection:', err);
          res.status(500).json({ error: 'Error creating collection' });
          return;
        }
        
        const collectionId = result.insertId;
        res.status(201).json({ supplierCollectionId, collectionId, supplierId, adminId, quantity, price, material_id, collectorId });
      });
    });
  };
  
  const getUser = (req, res) => {
    const supplier_id = req.params.id;

    const query = 'SELECT user_id FROM suppliers WHERE supplier_id = ?';
  
    db.query(query, [supplier_id], (err, results) => {
      if (err) {
        console.error('Error fetching collector: ', err);
        res.status(500).json({ error: 'Error fetching collector' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found for the given supplier ID' });
        return;
      }

      res.json(results[0]); 
    });
  };

  const getAllSuppliers = (req, res) => {

    const query = 'SELECT * FROM suppliers';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching suppliers: ', err);
        res.status(500).json({ error: 'Error fetching suppliers' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Suppliers not found.' });
        return;
      }
  
      res.json(results); 
    });
  };

  
export { getSupplier, createSupplierCollection, getUser, getAllSuppliers };
