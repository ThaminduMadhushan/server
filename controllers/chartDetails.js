import db from "../connect.js";

const getDriverCollection =  (req, res) => {

    const collection_id = req.params.id;
    
    const query = 'SELECT driver_collections.collection_id, driver_collections.quantity, DATE_FORMAT(driver_collections.updated_at, "%Y-%m-%d") AS date, bins.bin_name, materials.name AS material_name FROM driver_collections LEFT JOIN drivers ON drivers.driver_id = driver_collections.driver_id LEFT JOIN bins ON bins.bin_id = driver_collections.bin_id LEFT JOIN materials ON materials.material_id = driver_collections.material_id WHERE driver_collections.driver_id = ?';
  
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

  const getSalaryParameters =  (req, res) => {

    const role = req.params.id;
    
    const query = 'SELECT * FROM salary_parameters WHERE role = ?';
  
    db.query(query, [role], (err, result) => {
        if (err) {
            console.error('Error fetching salary parameters:', err);
            res.status(500).json({ error: 'Error salary parameters' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Salary parameters not found' });
            return;
        }
        res.json(result);
    });
  };

  const getProductDetails =  (req, res) => {
    
    const query = 'SELECT name, total_quantity, unit_price FROM Products WHERE status = "enable"';
  
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching salary parameters:', err);
            res.status(500).json({ error: 'Error salary parameters' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Salary parameters not found' });
            return;
        }
        res.json(result);
    });
  };

  const getCustomerOrderDetails =  (req, res) => {

    const customer_id = req.params.id;
    
    const query = 'SELECT * FROM Orders WHERE customer_id = ?';
  
    db.query(query, [customer_id], (err, result) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({ error: 'Error fetching orders' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Orders not found' });
            return;
        }
        res.json(result);
    });
  };



  export { getDriverCollection, getSalaryParameters, getProductDetails, getCustomerOrderDetails };
