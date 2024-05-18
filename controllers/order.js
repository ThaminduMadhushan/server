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

        // Update the products table after creating an order
        const updateProductQuery = 'UPDATE products SET total_quantity = total_quantity - ? WHERE product_id = ?';
        db.query(updateProductQuery, [quantity, product_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating product stock:', updateErr);
                res.status(500).json({ error: 'Error updating product stock' });
                return;
            }
            res.status(201).json({ id: orderId, name, product_id, quantity, price });
        });
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


// const cancelOrder = (req, res) => {
//     const orderId = req.params.id;
//     const adminId = req.body.adminId; // Get the admin ID from the request body
  
//     const query = 'UPDATE orders SET status = "cancelled", admin_id = ? WHERE order_id = ?';
//     db.query(query, [adminId, orderId], (err, result) => {
//       if (err) {
//         console.error('Error canceling order:', err);
//         res.status(500).json({ error: 'Error canceling order' });
//         return;
//       }
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'Order not found' });
//         return;
//       }
//       res.status(200).json({ message: 'Order cancelled successfully' });
//     });
//   };

const cancelOrder = (req, res) => {
    const orderId = req.params.id;
    const adminId = req.body.adminId; // Get the admin ID from the request body

    // Retrieve order details before cancellation to update product stock
    const getOrderQuery = 'SELECT product_id, quantity FROM orders WHERE order_id = ?';
    db.query(getOrderQuery, [orderId], (err, orderResult) => {
        if (err) {
            console.error('Error fetching order:', err);
            res.status(500).json({ error: 'Error fetching order' });
            return;
        }``
        if (orderResult.length === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        const { product_id, quantity } = orderResult[0];

        const cancelOrderQuery = 'UPDATE orders SET status = "cancelled", admin_id = ? WHERE order_id = ?';
        db.query(cancelOrderQuery, [adminId, orderId], (cancelErr, cancelResult) => {
            if (cancelErr) {
                console.error('Error cancelling order:', cancelErr);
                res.status(500).json({ error: 'Error cancelling order' });
                return;
            }
            if (cancelResult.affectedRows === 0) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            // Update the products table after cancelling an order
            const updateProductQuery = 'UPDATE products SET total_quantity = total_quantity + ? WHERE product_id = ?';
            db.query(updateProductQuery, [quantity, product_id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating product stock:', updateErr);
                    res.status(500).json({ error: 'Error updating product stock' });
                    return;
                }
                res.status(200).json({ message: 'Order cancelled successfully' });
            });
        });
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
    const { bailer_id, admin_id } = req.body;
    const query = 'UPDATE orders SET status = "accept", bailer_id = ?, admin_id = ? WHERE order_id = ?';
    db.query(query, [bailer_id, admin_id, orderId], (err, result) => {
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

export { getOrder, createOrder, deleteOrder, updateOrder, acceptOrder, cancelOrder}; 
