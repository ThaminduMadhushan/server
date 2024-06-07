import db from "../connect.js";

const getOrder = (req, res) => {
  const orderId = req.params.id;

  const query =
    'SELECT orders.order_id, orders.name AS order_name, orders.quantity, orders.price, orders.status,  DATE_FORMAT(orders.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(orders.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, products.name AS product_name FROM orders JOIN products ON orders.product_id = products.product_id WHERE orders.customer_id = ?';

  db.query(query, [orderId], (err, result) => {
    if (err) {
      console.error("Error fetching order:", err);
      res.status(500).json({ error: "Error fetching order" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(result);
  });
};

const createOrder = (req, res) => {
  const { customer_id, name, product_id, quantity, price } = req.body;

  const query =
    'INSERT INTO orders (customer_id, name, product_id, quantity, price, status) VALUES (?, ?, ?, ?, ?, "pending")';
  db.query(
    query,
    [customer_id, name, product_id, quantity, price],
    (err, result) => {
      if (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Error creating order" });
        return;
      }
      const orderId = result.insertId;

      // Update the products table after creating an order
      const updateProductQuery =
        "UPDATE products SET total_quantity = total_quantity - ? WHERE product_id = ?";
      db.query(
        updateProductQuery,
        [quantity, product_id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating product stock:", updateErr);
            res.status(500).json({ error: "Error updating product stock" });
            return;
          }
          res
            .status(201)
            .json({ id: orderId, name, product_id, quantity, price });
        }
      );
    }
  );
};

const deleteOrder = (req, res) => {
    const orderId = req.params.id;
  
    const getOrderQuery = "SELECT product_id, quantity FROM orders WHERE order_id = ?";
    db.query(getOrderQuery, [orderId], (err, orderResult) => {
      if (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ error: "Error fetching order" });
        return;
      }
      if (orderResult.length === 0) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
  
      const { product_id, quantity } = orderResult[0];
  
      // Update the products table after fetching the order
      const updateProductQuery = "UPDATE products SET total_quantity = total_quantity + ? WHERE product_id = ?";
      db.query(updateProductQuery, [quantity, product_id], (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating product stock:", updateErr);
          res.status(500).json({ error: "Error updating product stock" });
          return;
        }
  
        // Delete the order after successfully updating the product stock
        const deleteOrderQuery = 'DELETE FROM orders WHERE order_id = ?';
        db.query(deleteOrderQuery, [orderId], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error('Error deleting order:', deleteErr);
            res.status(500).json({ error: 'Error deleting order' });
            return;
          }
          if (deleteResult.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
          }
  
          res.status(200).json({ message: 'Order deleted successfully' });
        });
      });
    });
  };
  

const cancelOrder = (req, res) => {
  const orderId = req.params.id;
  const adminId = req.body.adminId; // Get the admin ID from the request body

  // Retrieve order details before cancellation to update product stock
  const getOrderQuery =
    "SELECT product_id, quantity FROM orders WHERE order_id = ?";
  db.query(getOrderQuery, [orderId], (err, orderResult) => {
    if (err) {
      console.error("Error fetching order:", err);
      res.status(500).json({ error: "Error fetching order" });
      return;
    }
    if (orderResult.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const { product_id, quantity } = orderResult[0];

    const cancelOrderQuery =
      'UPDATE orders SET status = "cancelled", admin_id = ?, notification_seen = "no" WHERE order_id = ?';
    db.query(
      cancelOrderQuery,
      [adminId, orderId],
      (cancelErr, cancelResult) => {
        if (cancelErr) {
          console.error("Error cancelling order:", cancelErr);
          res.status(500).json({ error: "Error cancelling order" });
          return;
        }
        if (cancelResult.affectedRows === 0) {
          res.status(404).json({ error: "Order not found" });
          return;
        }

        // Update the products table after cancelling an order
        const updateProductQuery =
          "UPDATE products SET total_quantity = total_quantity + ? WHERE product_id = ?";
        db.query(
          updateProductQuery,
          [quantity, product_id],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating product stock:", updateErr);
              res.status(500).json({ error: "Error updating product stock" });
              return;
            }
            res.status(200).json({ message: "Order cancelled successfully" });
          }
        );
      }
    );
  });
};

const updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { name, product_id, quantity, price } = req.body;

  const getOrderQuery = "SELECT * FROM orders WHERE order_id = ?";
  const updateProductsQueryAdd =
    "UPDATE products SET total_quantity = total_quantity + ? WHERE product_id = ?";
  const updateOrderQuery =
    "UPDATE orders SET name = ?, product_id = ?, quantity = ?, price = ? WHERE order_id = ?";
  const updateProductsQuerySubtract =
    "UPDATE products SET total_quantity = total_quantity - ? WHERE product_id = ?";

  // First, fetch the current order details
  db.query(getOrderQuery, [orderId], (err, orderResult) => {
    if (err) {
      console.error("Error fetching order:", err);
      res.status(500).json({ error: "Error fetching order" });
      return;
    }
    if (orderResult.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const currentOrder = orderResult[0];
    const { product_id: currentProductId, quantity: currentQuantity } =
      currentOrder;

    // Add back the quantity to the current product stock
    db.query(
      updateProductsQueryAdd,
      [currentQuantity, currentProductId],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating products:", updateErr);
          res.status(500).json({ error: "Error updating products" });
          return;
        }

        // Update the order with new details
        db.query(
          updateOrderQuery,
          [name, product_id, quantity, price, orderId],
          (err, result) => {
            if (err) {
              console.error("Error updating order:", err);
              res.status(500).json({ error: "Error updating order" });
              return;
            }
            if (result.affectedRows === 0) {
              res.status(404).json({ error: "Order not found" });
              return;
            }

            // Subtract the new quantity from the new product stock
            db.query(
              updateProductsQuerySubtract,
              [quantity, product_id],
              (updateErr, updateResult) => {
                if (updateErr) {
                  console.error("Error updating product stock:", updateErr);
                  res
                    .status(500)
                    .json({ error: "Error updating product stock" });
                  return;
                }

                res
                  .status(200)
                  .json({
                    message: "Order and product stock updated successfully",
                    id: orderId,
                    name,
                    product_id,
                    quantity,
                    price,
                  });
              }
            );
          }
        );
      }
    );
  });
};

const acceptOrder = (req, res) => {
  const orderId = req.params.id;
  const { bailer_id, admin_id } = req.body;
  const query =
    'UPDATE orders SET status = "accept", bailer_id = ?, admin_id = ?, notification_seen = "no" WHERE order_id = ?';
  db.query(query, [bailer_id, admin_id, orderId], (err, result) => {
    if (err) {
      console.error("Error accepting order:", err);
      res.status(500).json({ error: "Error accepting order" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order accepted successfully" });
  });
};

const finishedOrder = (req, res) => {
  const orderId = req.params.id;
  const adminId = req.body.adminId; // Get the admin ID from the request body

  const query =
    'UPDATE orders SET status = "finished", admin_id = ? WHERE order_id = ?';
  db.query(query, [adminId, orderId], (err, result) => {
    if (err) {
      console.error("Error fetching order:", err);
      res.status(500).json({ error: "Error fetching order" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order finished successfully" });
  });
};

export {
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  acceptOrder,
  cancelOrder,
  finishedOrder,
};
