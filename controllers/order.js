// import db from "../connect.js";

// // Controller to handle fetching all orders
// const getOrder = (req, res) => {
//     // Query to fetch all orders from the database
//     // const query = 'SELECT * FROM orders';
//     const query = 'SELECT id, material, quantity,price, name, status, username, employee, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM orders';
  
//     // Execute the query
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching order: ', err);
//         res.status(500).json({ error: 'Error fetching order' });
//         return;
//       }
  
//       // Send the order as JSON response
//       res.json(results);
//     });
// };

// // Controller to handle creating a new order
// const createOrder = (req, res) => {
//     const { customer_id, name, product_id , quantity, price  } = req.body;
  
//     // Validation
//     if (!name || !quantity || !price) {
//       return res.status(400).json({ error: 'Please provide name, price, and quantity.' });
//     }
  
//     // Insert the new order into the database
//     const query = 'INSERT INTO orders (customer_id, name, product_id, quantity, price, status ) VALUES (?, ?, ?, ?, ?, "pending")';
//     db.query(query, [customer_id, name, product_id, quantity, price], (err, result) => {
//       if (err) {
//         console.error('Error creating order:', err);
//         return res.status(500).json({ error: 'Error creating order.' });
//       }
//       // Return the newly created order
//       const orderId = result.insertId;
//       res.status(201).json({ id: orderId, name, material, quantity, price, username });
//     });
// };

// // Controller to handle deleting a order
// const deleteOrder = (req, res) => {
//     const orderId = req.params.id;

//     // Query to delete a order by ID
//     const query = 'DELETE FROM orders WHERE id = ?';

//     // Execute the query
//     db.query(query, [orderId], (err, result) => {
//         if (err) {
//             console.error('Error deleting order:', err);
//             return res.status(500).json({ error: 'Error deleting order' });
//         }

//         if (result.affectedRows === 0) {
//             // If no rows were affected, it means the order with the given ID doesn't exist
//             return res.status(404).json({ error: 'order not found' });
//         }

//         res.status(200).json({ message: 'order deleted successfully' });
//     });
// };

// const updateOrder = (req, res) => {
//   const orderId = req.params.id;
//   const { name, material, quantity, price } = req.body;

//   // Validation
//   if (!name || !material || !quantity || !price) {
//       return res.status(400).json({ error: 'Please provide name, material, price and quantity.' });
//   }

//   // Update the order in the database
//   const query = 'UPDATE orders SET name = ?, material = ?, quantity = ?, price = ? WHERE id = ?';
//   db.query(query, [name, material, quantity,price, orderId], (err, result) => {
//       if (err) {
//           console.error('Error updating order:', err);
//           return res.status(500).json({ error: 'Error updating order.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the order with the given ID doesn't exist
//           return res.status(404).json({ error: 'order not found' });
//       }

//       res.status(200).json({ message: 'order updated successfully' });
//   });
// };

// // const acceptOrder = (req, res) => {
// //   const orderId = req.params.id;
// //   const { status } = req.body;

// //   // Update the order in the database
// //   const query = 'UPDATE orders SET status = ? WHERE id = ?';
// //   db.query(query, [`accept`, orderId], (err, result) => {
// //       if (err) {
// //           console.error('Error accept order:', err);
// //           return res.status(500).json({ error: 'Error accepting order.' });
// //       }

// //       if (result.affectedRows === 0) {
// //           // If no rows were affected, it means the order with the given ID doesn't exist
// //           return res.status(404).json({ error: 'order not found' });
// //       }

// //       res.status(200).json({ message: 'order accepted successfully' });
// //   });
// // };

// const acceptOrder = (req, res) => {
//   const orderId = req.params.id;
//   const { name } = req.body; // Changed to name

//   // Update the order in the database
//   const query = 'UPDATE orders SET status = "accept", employee = ? WHERE id = ?'; // Update status and username
//   db.query(query, [name, orderId], (err, result) => {
//       if (err) {
//           console.error('Error accept order:', err);
//           return res.status(500).json({ error: 'Error accepting order.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the order with the given ID doesn't exist
//           return res.status(404).json({ error: 'order not found' });
//       }

//       res.status(200).json({ message: 'order accepted successfully' });
//   });
// };



// export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder };



// import db from "../connect.js";

// // Controller to handle fetching all orders
// const getOrder = (req, res) => {
//     // Query to fetch all orders from the database
//     // const query = 'SELECT * FROM orders';
//     const query = 'SELECT id, material, quantity,price, name, status, username, employee, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM orders';
  
//     // Execute the query
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching order: ', err);
//         res.status(500).json({ error: 'Error fetching order' });
//         return;
//       }
  
//       // Send the order as JSON response
//       res.json(results);
//     });
// };

// // Controller to handle creating a new order
// // const createOrder = (req, res) => {
// //     const { customer_id, name, product_id , quantity, price  } = req.body;
  
// //     // Validation
// //     if (!name || !quantity || !product_id || !price) {
// //       return res.status(400).json({ error: 'Please provide name, price, product and quantity.' });
// //     }
  
// //     // Insert the new order into the database
// //     const query = 'INSERT INTO orders (customer_id, name, product_id, quantity, price, status ) VALUES (?, ?, ?, ?, ?, "pending")';
// //     db.query(query, [customer_id, name, product_id, quantity, price], (err, result) => {
// //       if (err) {
// //         console.error('Error creating order:', err);
// //         return res.status(500).json({ error: 'Error creating order.' });
// //       }
// //       // Return the newly created order
// //       const orderId = result.insertId;
// //       res.status(201).json({ id: orderId, name, material, quantity, price, username });
// //     });
// // };
// const createOrder = (req, res) => {
//   const { customer_id, name, product_id, quantity, price } = req.body; // Change name to product_id

//   // Validation
//   if (!product_id || !quantity || !price || !name) {
//     return res.status(400).json({ error: 'Please provide product ID, name, price, and quantity.' });
//   }

//   // Insert the new order into the database
//   const query = 'INSERT INTO orders (customer_id, name, product_id, quantity, price, status) VALUES (?, ?, ?, ?, ?, "pending")';
//   db.query(query, [customer_id, name, product_id, quantity, price], (err, result) => {
//     if (err) {
//       console.error('Error creating order:', err);
//       return res.status(500).json({ error: 'Error creating order.' });
//     }
//     // Return the newly created order
//     const orderId = result.insertId;
//     res.status(201).json({ id: orderId, name, product_id, quantity, price });
//   });
// };

// // Controller to handle deleting a order
// const deleteOrder = (req, res) => {
//     const orderId = req.params.order_id;

//     // Query to delete a order by ID
//     const query = 'DELETE FROM orders WHERE order_id = ?';

//     // Execute the query
//     db.query(query, [orderId], (err, result) => {
//         if (err) {
//             console.error('Error deleting order:', err);
//             return res.status(500).json({ error: 'Error deleting order' });
//         }

//         if (result.affectedRows === 0) {
//             // If no rows were affected, it means the order with the given ID doesn't exist
//             return res.status(404).json({ error: 'order not found' });
//         }

//         res.status(200).json({ message: 'order deleted successfully' });
//     });
// };

// const updateOrder = (req, res) => {
//   const orderId = req.params.order_id;
//   const { name, product_id, quantity, price } = req.body;

//   // Validation
//   if (!name || !product_id || !quantity || !price) {
//       return res.status(400).json({ error: 'Please provide name, material, price and quantity.' });
//   }

//   // Update the order in the database
//   const query = 'UPDATE orders SET name = ?, product_id = ?, quantity = ?, price = ? WHERE order_id = ?';
//   db.query(query, [name, product_id, quantity, price, orderId], (err, result) => {
//       if (err) {
//           console.error('Error updating order:', err);
//           return res.status(500).json({ error: 'Error updating order.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the order with the given ID doesn't exist
//           return res.status(404).json({ error: 'order not found' });
//       }

//       res.status(200).json({ message: 'order updated successfully' });
//   });
// };

// // const acceptOrder = (req, res) => {
// //   const orderId = req.params.id;
// //   const { status } = req.body;

// //   // Update the order in the database
// //   const query = 'UPDATE orders SET status = ? WHERE id = ?';
// //   db.query(query, [`accept`, orderId], (err, result) => {
// //       if (err) {
// //           console.error('Error accept order:', err);
// //           return res.status(500).json({ error: 'Error accepting order.' });
// //       }

// //       if (result.affectedRows === 0) {
// //           // If no rows were affected, it means the order with the given ID doesn't exist
// //           return res.status(404).json({ error: 'order not found' });
// //       }

// //       res.status(200).json({ message: 'order accepted successfully' });
// //   });
// // };

// const acceptOrder = (req, res) => {
//   const orderId = req.params.id;
//   const { name } = req.body; // Changed to name

//   // Update the order in the database
//   const query = 'UPDATE orders SET status = "accept", employee = ? WHERE id = ?'; // Update status and username
//   db.query(query, [name, orderId], (err, result) => {
//       if (err) {
//           console.error('Error accept order:', err);
//           return res.status(500).json({ error: 'Error accepting order.' });
//       }

//       if (result.affectedRows === 0) {
//           // If no rows were affected, it means the order with the given ID doesn't exist
//           return res.status(404).json({ error: 'order not found' });
//       }

//       res.status(200).json({ message: 'order accepted successfully' });
//   });
// };



// export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder };



// import db from "../connect.js";

// const getOrder = (req, res) => {
//     // const query = 'SELECT order_id, customer_id, name, product_id, quantity, price, status FROM orders WHERE customer_id ';

//     // db.query(query, (err, results) => {
//     //     if (err) {
//     //         console.error('Error fetching orders:', err);
//     //         res.status(500).json({ error: 'Error fetching orders' });
//     //         return;
//     //     }
//     //     res.json(results);
//     // });

//     const userId = req.session.user.id;
//   const sql = 'SELECT * FROM orders WHERE user_id = ?';
//   db.query(sql, userId, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(result);
//     }
//   });
// };

// const createOrder = (req, res) => {
//     const { customer_id, name, product_id, quantity, price } = req.body;
//     const query = 'INSERT INTO orders (customer_id, name, product_id, quantity, price, status) VALUES (?, ?, ?, ?, ?, "pending")';
//     db.query(query, [customer_id, name, product_id, quantity, price], (err, result) => {
//         if (err) {
//             console.error('Error creating order:', err);
//             res.status(500).json({ error: 'Error creating order' });
//             return;
//         }
//         const orderId = result.insertId;
//         res.status(201).json({ id: orderId, name, product_id, quantity, price });
//     });
// };

// const deleteOrder = (req, res) => {
//     const orderId = req.params.id;
//     const query = 'DELETE FROM orders WHERE id = ?';
//     db.query(query, [orderId], (err, result) => {
//         if (err) {
//             console.error('Error deleting order:', err);
//             res.status(500).json({ error: 'Error deleting order' });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ error: 'Order not found' });
//             return;
//         }
//         res.status(200).json({ message: 'Order deleted successfully' });
//     });
// };

// const updateOrder = (req, res) => {
//     const orderId = req.params.id;
//     const { name, product_id, quantity, price } = req.body;
//     const query = 'UPDATE orders SET name = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?';
//     db.query(query, [name, product_id, quantity, price, orderId], (err, result) => {
//         if (err) {
//             console.error('Error updating order:', err);
//             res.status(500).json({ error: 'Error updating order' });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ error: 'Order not found' });
//             return;
//         }
//         res.status(200).json({ message: 'Order updated successfully' });
//     });
// };

// const acceptOrder = (req, res) => {
//     const orderId = req.params.id;
//     const { employee } = req.body;
//     const query = 'UPDATE orders SET status = "accept", employee = ? WHERE id = ?';
//     db.query(query, [employee, orderId], (err, result) => {
//         if (err) {
//             console.error('Error accepting order:', err);
//             res.status(500).json({ error: 'Error accepting order' });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ error: 'Order not found' });
//             return;
//         }
//         res.status(200).json({ message: 'Order accepted successfully' });
//     });
// };

// export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder };

// orderController.js

import db from "../connect.js";

const getOrder =  (req, res) => {
    const orderId = req.params.id;
    
    const query = 'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ?';
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error('Error fetching order:', err);
            res.status(500).json({ error: 'Error fetching order' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.json(result);
    });
};

const createOrder = (req, res) => {
    const { customer_id, name, product_id, quantity, price } = req.body;
    const query = 'INSERT INTO orders (customer_id, name, product_id, quantity, price, status) VALUES (?, ?, ?, ?, ?, "pending")';
    db.query(query, [customer_id, name, product_id, quantity, price], (err, result) => {
        if (err) {
            console.error('Error creating order:', err);
            res.status(500).json({ error: 'Error creating order' });
            return;
        }
        const orderId = result.insertId;
        res.status(201).json({ id: orderId, name, product_id, quantity, price });
    });
};

const deleteOrder = (req, res) => {
    const orderId = req.params.id;
    const query = 'DELETE FROM orders WHERE order_id = ?';
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err);
            res.status(500).json({ error: 'Error deleting order' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    });
};

const updateOrder = (req, res) => {
    const orderId = req.params.id;
    const { name, product_id, quantity, price } = req.body;
    const query = 'UPDATE orders SET name = ?, product_id = ?, quantity = ?, price = ? WHERE order_id = ?';
    db.query(query, [name, product_id, quantity, price, orderId], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            res.status(500).json({ error: 'Error updating order' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order updated successfully' });
    });
};

const acceptOrder = (req, res) => {
    const orderId = req.params.id;
    const { employee } = req.body;
    const query = 'UPDATE orders SET status = "accept", employee = ? WHERE id = ?';
    db.query(query, [employee, orderId], (err, result) => {
        if (err) {
            console.error('Error accepting order:', err);
            res.status(500).json({ error: 'Error accepting order' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order accepted successfully' });
    });
};

export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder };
