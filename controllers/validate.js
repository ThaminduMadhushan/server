import db from "../connect.js";

const getEmail = (req, res) => {
  // Query to fetch all employees
    const query = 'SELECT email FROM users';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching emails: ', err);
        res.status(500).json({ error: 'Error fetching emails' });
        return;
      }

      res.json(results);
    });
};

export { getEmail };