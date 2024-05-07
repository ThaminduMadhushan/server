import db from "../connect.js";

const getCustomer = (req, res) => {
  const user_id = req.params.id;
  // Query to fetch customer details for the given user ID
  const query = 'SELECT customer_id FROM customers WHERE user_id = ?';

  // Execute the query with the user ID as a parameter
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching customer: ', err);
      res.status(500).json({ error: 'Error fetching customer' });
      return;
    }

    // Check if customer details exist for the given user ID
    if (results.length === 0) {
      res.status(404).json({ error: 'Customer not found for the given user ID' });
      return;
    }

    // Send the customer details as a response
    res.json(results[0]); // Assuming there's only one customer for each user ID
  });
};

export { getCustomer };
