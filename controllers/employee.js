import db from "../connect.js";

const getBailer = (req, res) => {
  // Query to fetch all employees
    const query = 'SELECT * FROM bailers';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching Bailers: ', err);
        res.status(500).json({ error: 'Error fetching Bailers' });
        return;
      }

      res.json(results);
    });
};

export { getBailer };
