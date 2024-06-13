// import db from "../connect.js";

// // Get user details counts
// const getUserDetails = (req, res) => {
//   const queries = [
//     'SELECT COUNT(*) AS total_users FROM users',
//     'SELECT COUNT(*) AS total_customers FROM customers',
//     'SELECT COUNT(*) AS total_suppliers FROM suppliers',
//     'SELECT COUNT(*) AS total_drivers FROM drivers',
//     'SELECT COUNT(*) AS total_bailers FROM bailers'
//   ];

//   const executeQueries = (queries) => {
//     return new Promise((resolve, reject) => {
//       let results = {};
//       let completed = 0;

//       queries.forEach((query, index) => {
//         db.query(query, (err, result) => {
//           if (err) {
//             reject(err);
//             return;
//           }

//           switch (index) {
//             case 0:
//               results.total_users = result[0].total_users;
//               break;
//             case 1:
//               results.total_customers = result[0].total_customers;
//               break;
//             case 2:
//               results.total_suppliers = result[0].total_suppliers;
//               break;
//             case 3:
//               results.total_drivers = result[0].total_drivers;
//               break;
//             case 4:
//               results.total_bailers = result[0].total_bailers;
//               break;
//             default:
//               break;
//           }

//           completed += 1;
//           if (completed === queries.length) {
//             resolve(results);
//           }
//         });
//       });
//     });
//   };

//   executeQueries(queries)
//     .then((results) => {
//       res.json(results);
//     })
//     .catch((err) => {
//       console.error('Error details: ', err);
//       res.status(500).json({ error: 'Error fetching details' });
//     });
// };

// // Get new users for selected month
// const getNewUsers = (req, res) => {
//   const selectedDate = new Date(req.body.date);
//   const month = selectedDate.getMonth() + 1;
//   const year = selectedDate.getFullYear();

//   const query1 = `
//     SELECT COUNT(*) AS new_customers 
//     FROM customers 
//     WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
//   `;
//   const query2 = `
//     SELECT COUNT(*) AS new_suppliers 
//     FROM suppliers 
//     WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
//   `;

//   const params = [month, year];

//   db.query(query1, params, (err, customersResult) => {
//     if (err) {
//       console.error("Error fetching new customers:", err);
//       res.status(500).json({ error: "Error fetching new customers" });
//       return;
//     }

//     db.query(query2, params, (err, suppliersResult) => {
//       if (err) {
//         console.error("Error fetching new suppliers:", err);
//         res.status(500).json({ error: "Error fetching new suppliers" });
//         return;
//       }

//       res.json({
//         new_customers: customersResult[0].new_customers,
//         new_suppliers: suppliersResult[0].new_suppliers,
//       });
//     });
//   });
// };


// // Get new users for selected month
// const getMaterial = (req, res) => {
//   // Query to fetch all materials from the database
//   const query = 'SELECT total_quantity, name AS material_name FROM materials';

//   // Execute the query
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching material: ', err);
//       res.status(500).json({ error: 'Error fetching material' });
//       return;
//     }

//     // Send the material as JSON response
//     res.json(results);
//   });
// };

// const getProducts = (req, res) => {

//   const query = 'SELECT total_quantity, name AS product_name FROM products';

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching products: ', err);
//       res.status(500).json({ error: 'Error fetching products' });
//       return;
//     }

//     res.json(results);
//   });
// };

// const getMonthlyMaterials = (req, res) => {

//   const query = 'SELECT m.material_name, SUM(c.quantity) AS collected_quantity FROM collections c JOIN materials m ON c.material_id = m.material_id WHERE MONTH(c.created_at) = ? AND YEAR(c.created_at) = ? GROUP BY m.material_name ';

//   db.query(query, [req.params.month, req.params.year], (err, results) => {
//     if (err) {
//       console.error('Error fetching materials: ', err);
//       res.status(500).json({ error: 'Error fetching materials' });
//       return;
//     }

//     res.json(results);
//   });
// };

// const getMonthlyProducts = (req, res) => {

//   const query = 'SELECT p.product_name, SUM(bd.quantity) AS collected_quantity FROM bailing_details bd JOIN products p ON bd.product_id = p.product_id WHERE MONTH(bd.created_at) = ? AND YEAR(bd.created_at) = ? GROUP BY p.product_name';

//   db.query(query, [req.params.month, req.params.year], (err, results) => {
//     if (err) {
//       console.error('Error fetching products: ', err);
//       res.status(500).json({ error: 'Error fetching products' });
//       return;
//     }

//     res.json(results);
//   });
// };

// const getTotalSalary = (req, res) => {

//   const query = 'SELECT SUM(salary) AS total_salary FROM salaries WHERE MONTH(payment_date) = ? AND YEAR(payment_date) = ?'

//   db.query(query, [req.params.month, req.params.year], (err, results) => {
//     if (err) {
//       console.error('Error fetching salary: ', err);
//       res.status(500).json({ error: 'Error fetching salary' });
//       return;
//     } 

//     res.json(results);
//   });

// };

// export { getUserDetails, getNewUsers, getMaterial, getProducts, getMonthlyMaterials, getMonthlyProducts, getTotalSalary };


import db from "../connect.js";

// Get user details counts
const getUserDetails = (req, res) => {
  const queries = [
    'SELECT COUNT(*) AS total_users FROM users',
    'SELECT COUNT(*) AS total_customers FROM customers',
    'SELECT COUNT(*) AS total_suppliers FROM suppliers',
    'SELECT COUNT(*) AS total_drivers FROM drivers',
    'SELECT COUNT(*) AS total_bailers FROM bailers'
  ];

  const executeQueries = (queries) => {
    return new Promise((resolve, reject) => {
      let results = {};
      let completed = 0;

      queries.forEach((query, index) => {
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          switch (index) {
            case 0:
              results.total_users = result[0].total_users;
              break;
            case 1:
              results.total_customers = result[0].total_customers;
              break;
            case 2:
              results.total_suppliers = result[0].total_suppliers;
              break;
            case 3:
              results.total_drivers = result[0].total_drivers;
              break;
            case 4:
              results.total_bailers = result[0].total_bailers;
              break;
            default:
              break;
          }

          completed += 1;
          if (completed === queries.length) {
            resolve(results);
          }
        });
      });
    });
  };

  executeQueries(queries)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error('Error details: ', err);
      res.status(500).json({ error: 'Error fetching details' });
    });
};

// Get new users for selected month
const getNewUsers = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query1 = `
    SELECT COUNT(*) AS new_customers 
    FROM customers 
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;
  const query2 = `
    SELECT COUNT(*) AS new_suppliers 
    FROM suppliers 
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;

  const params = [month, year];

  db.query(query1, params, (err, customersResult) => {
    if (err) {
      console.error("Error fetching new customers:", err);
      res.status(500).json({ error: "Error fetching new customers" });
      return;
    }

    db.query(query2, params, (err, suppliersResult) => {
      if (err) {
        console.error("Error fetching new suppliers:", err);
        res.status(500).json({ error: "Error fetching new suppliers" });
        return;
      }

      res.json({
        new_customers: customersResult[0].new_customers,
        new_suppliers: suppliersResult[0].new_suppliers,
      });
    });
  });
};
// Get materials details
// Get materials details
const getMaterials = (req, res) => {
  const query = 'SELECT SUM(total_quantity) AS total_quantity, name AS material_name FROM materials GROUP BY name';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching materials: ', err);
      res.status(500).json({ error: 'Error fetching materials' });
      return;
    }

    res.json(results);
  });
};


// Get products details
const getProducts = (req, res) => {
  const query = 'SELECT SUM(total_quantity) AS total_quantity, name AS product_name FROM products GROUP BY name';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      res.status(500).json({ error: 'Error fetching products' });
      return;
    }

    res.json(results);
  });
};

// Get monthly material collections
const getMonthlyMaterials = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT m.name AS material_name, SUM(c.quantity) AS collected_quantity 
    FROM collections c 
    JOIN materials m ON c.material_id = m.material_id 
    WHERE MONTH(c.created_at) = ? AND YEAR(c.created_at) = ? 
    GROUP BY m.name
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching monthly material collections: ', err);
      res.status(500).json({ error: 'Error fetching monthly material collections' });
      return;
    }

    res.json(results);
  });
};

// Get monthly product collections
const getMonthlyProducts = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT p.name AS product_name, SUM(bd.product_quantity) AS collected_quantity 
    FROM bailing_details bd 
    JOIN products p ON bd.product_id = p.product_id 
    WHERE MONTH(bd.created_at) = ? AND YEAR(bd.created_at) = ? 
    GROUP BY p.name
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching monthly product collections: ', err);
      res.status(500).json({ error: 'Error fetching monthly product collections' });
      return;
    }

    res.json(results);
  });
};

// Get total salary paid for the selected month
const getTotalSalary = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT SUM(full_payment) AS total_salary 
    FROM salary 
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching total salary: ', err);
      res.status(500).json({ error: 'Error fetching total salary' });
      return;
    }

    res.json(results);
  });
};

const getMostCollectedSupplier = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT s.firstname AS supplier_name, SUM(c.quantity) AS total_quantity
    FROM collections c
    JOIN suppliers s ON c.user_id = s.user_id
    WHERE MONTH(c.created_at) = ? AND YEAR(c.created_at) = ?
    GROUP BY s.firstname
    ORDER BY total_quantity DESC
    LIMIT 1
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching most collected supplier: ', err);
      res.status(500).json({ error: 'Error fetching most collected supplier' });
      return;
    }

    res.json(results);
  });
};

const getTotalOrders = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT COUNT(*) AS total_orders
    FROM orders
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching total orders: ', err);
      res.status(500).json({ error: 'Error fetching total orders' });
      return;
    }

    res.json(results);
  });
};

const getTotalFinishedOrders = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT COUNT(*) AS total_finished_orders
    FROM orders
    WHERE status = 'finished' AND MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching finished orders: ', err);
      res.status(500).json({ error: 'Error fetching finished orders' });
      return;
    }

    res.json(results);
  });
};

const getTotalCancelledOrders = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT COUNT(*) AS total_cancelled_orders
    FROM orders
    WHERE status = 'cancelled' AND MONTH(created_at) = ? AND YEAR(created_at) = ?
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching cancelled orders: ', err);
      res.status(500).json({ error: 'Error fetching cancelled orders' });
      return;
    }

    res.json(results);
  });
};

const getTotalProductQuantity = (req, res) => {
  const selectedDate = new Date(req.body.date);
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const query = `
    SELECT p.name AS product_name, SUM(od.quantity) AS total_quantity
    FROM orders od
    JOIN products p ON od.product_id = p.product_id
    JOIN orders o ON od.order_id = o.order_id
    WHERE MONTH(o.created_at) = ? AND YEAR(o.created_at) = ?
    GROUP BY p.name
  `;

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error fetching product quantities: ', err);
      res.status(500).json({ error: 'Error fetching product quantities' });
      return;
    }

    res.json(results);
  });
};

const getTotalMaterialCollected = (req, res) => {
  const query = `
    SELECT m.name AS material_name, d.firstname AS driver_name, SUM(dc.quantity) AS total_quantity
    FROM driver_collections dc
    JOIN materials m ON dc.material_id = m.material_id
    JOIN drivers d ON dc.driver_id = d.driver_id
    GROUP BY m.name, d.firstname
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching material quantities: ', err);
      res.status(500).json({ error: 'Error fetching material quantities' });
      return;
    }

    res.json(results);
  });
};

const getTotalCollectionBins = (req, res) => {
  const query = `
    SELECT b.bin_name AS bin_name, SUM(c.quantity) AS total_quantity
    FROM driver_collections c
    JOIN bins b ON c.bin_id = b.bin_id
    GROUP BY b.bin_name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bin collections: ', err);
      res.status(500).json({ error: 'Error fetching bin collections' });
      return;
    }

    res.json(results);
  });
};


export { getMaterials, getProducts, getMonthlyMaterials, getMonthlyProducts, getTotalSalary, getNewUsers, getUserDetails, getTotalOrders, getTotalFinishedOrders, getTotalCancelledOrders, getTotalProductQuantity, getTotalMaterialCollected, getTotalCollectionBins, getMostCollectedSupplier };
