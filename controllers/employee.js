import db from "../connect.js";
import bcrypt from "bcrypt";

const getBailer = (req, res) => {
  // Query to fetch all employees
    const query = 'SELECT * FROM bailers WHERE status = "active"';
  
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

const getEmployee = (req, res) => {
  // Queries to fetch all drivers and bailers
  const query1 = 'SELECT drivers.driver_id AS id, drivers.user_id, drivers.firstname, drivers.lastname, users.email, drivers.phone, drivers.status, drivers.address, DATE_FORMAT(drivers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(drivers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, drivers.admin_id, drivers.user_id, users.role FROM drivers LEFT JOIN users ON drivers.user_id = users.user_id';

  const query2 = 'SELECT bailers.bailer_id AS id, bailers.user_id, bailers.firstname, bailers.lastname, users.email, bailers.phone, bailers.address, bailers.status, DATE_FORMAT(bailers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bailers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, bailers.admin_id, bailers.user_id, users.role FROM bailers LEFT JOIN users ON bailers.user_id = users.user_id';

  db.query(query1, (err1, drivers) => {
    if (err1) {
      console.error('Error fetching drivers: ', err1);
      res.status(500).json({ error: 'Error fetching drivers' });
      return;
    } 

    db.query(query2, (err2, bailers) => {
      if (err2) {
        console.error('Error fetching bailers: ', err2);
        res.status(500).json({ error: 'Error fetching bailers' });
        return;
      }

      // Combine drivers and bailers
      const employees = [...drivers, ...bailers];
      res.json(employees);
    });
  });
};


const addEmployee = (req, res) => {
  const { email, firstname, lastname, phone, role, address, admin_id } = req.body;

  // Check if the email already exists
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length > 0) return res.status(409).json({ message: "User already exists!" });

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('12345678', salt);

    // Insert into users table
    const insertUserQuery = "INSERT INTO users (`email`, `password`, `role`) VALUES (?, ?, ?)";
    const userValues = [email, hash, role];

    db.query(insertUserQuery, userValues, (err, userResult) => {
      if (err) return res.status(500).json({ error: err });
      const userid = userResult.insertId;

      // Insert into role-specific table
      let insertRoleSpecificQuery;
      let roleSpecificValues;

      switch (req.body.role.toLowerCase()) {
        case "bailer":
          insertRoleSpecificQuery = "INSERT INTO bailers (`user_id`, `firstname`, `lastname`, `phone`, `address`, `status`, `admin_id`) VALUES (?, ?, ?, ?, ?, ?, ?)";
          roleSpecificValues = [userid, firstname, lastname, phone, address, "active", admin_id];
          break;
        case "driver":
          insertRoleSpecificQuery = "INSERT INTO drivers (`user_id`, `firstname`, `lastname`, `phone`, `address`, `status`, `admin_id`) VALUES (?, ?, ?, ?, ?, ?, ?)";
          roleSpecificValues = [userid, firstname, lastname, phone, address, "active", admin_id];
          break;
        default:
          return res.status(400).json({ message: "Invalid role" });
      }

      db.query(insertRoleSpecificQuery, roleSpecificValues, (err) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json({ message: "User registered successfully." });
      });
    });
  });
};

const changeStatus = (req, res) => {
  const user_id = req.params.user_id;

  // Function to update status in the given table
  const updateStatus = (table, user_id, callback) => {
    const query = `UPDATE ${table} SET status = 'inactive' WHERE user_id = ?`;
    db.query(query, [user_id], callback);
  };

  // Check if the user exists in the drivers table
  db.query('SELECT * FROM drivers WHERE user_id = ?', [user_id], (err, driverData) => {
    if (err) return res.status(500).json({ error: err });

    if (driverData.length) {
      // User is in drivers table, update status
      updateStatus('drivers', user_id, (err) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json({ message: 'Employee status updated to inactive.' });
      });
    } else {
      // Check if the user exists in the bailers table
      db.query('SELECT * FROM bailers WHERE user_id = ?', [user_id], (err, bailerData) => {
        if (err) return res.status(500).json({ error: err });

        if (bailerData.length) {
          // User is in bailers table, update status
          updateStatus('bailers', user_id, (err) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(200).json({ message: 'Employee status updated to inactive.' });
          });
        } else {
          return res.status(404).json({ message: 'Employee not found.' });
        }
      });
    }
  });
}


const changeStatusActive = (req, res) => {

  const user_id = req.params.user_id;

  // Function to update status in the given table
  const updateStatus = (table, user_id, callback) => {
    const query = `UPDATE ${table} SET status = 'active' WHERE user_id = ?`;
    db.query(query, [user_id], callback);
  };

  // Check if the user exists in the drivers table
  db.query('SELECT * FROM drivers WHERE user_id = ?', [user_id], (err, driverData) => {
    if (err) return res.status(500).json({ error: err });

    if (driverData.length) {
      // User is in drivers table, update status
      updateStatus('drivers', user_id, (err) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json({ message: 'Employee status updated to active.' });
      });
    } else {
      // Check if the user exists in the bailers table
      db.query('SELECT * FROM bailers WHERE user_id = ?', [user_id], (err, bailerData) => {
        if (err) return res.status(500).json({ error: err });

        if (bailerData.length) {
          // User is in bailers table, update status
          updateStatus('bailers', user_id, (err) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(200).json({ message: 'Employee status updated to active.' });
          });
        } else {
          return res.status(404).json({ message: 'Employee not found.' });
        }
      });
    }
  });
}

const getEmployeesFromUsers = (req, res) => {

 const query = 'SELECT * FROM users WHERE role= "bailer" OR role= "driver"';
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching employees: ', err);
        res.status(500).json({ error: 'Error fetching employees' });
        return;
      }

      res.json(results);
    });

}

const getActiveEmployees = (req, res) => {
  // Queries to fetch all drivers and bailers
  const query1 = 'SELECT drivers.driver_id AS id, drivers.user_id, drivers.firstname, drivers.lastname, users.email, drivers.phone, drivers.status, drivers.address, DATE_FORMAT(drivers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(drivers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, drivers.admin_id, drivers.user_id, users.role FROM drivers LEFT JOIN users ON drivers.user_id = users.user_id WHERE drivers.status = "active"';

  const query2 = 'SELECT bailers.bailer_id AS id, bailers.user_id, bailers.firstname, bailers.lastname, users.email, bailers.phone, bailers.address, bailers.status, DATE_FORMAT(bailers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bailers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, bailers.admin_id, bailers.user_id, users.role FROM bailers LEFT JOIN users ON bailers.user_id = users.user_id WHERE bailers.status = "active"';

  db.query(query1, (err1, drivers) => {
    if (err1) {
      console.error('Error fetching drivers: ', err1);
      res.status(500).json({ error: 'Error fetching drivers' });
      return;
    } 

    db.query(query2, (err2, bailers) => {
      if (err2) {
        console.error('Error fetching bailers: ', err2);
        res.status(500).json({ error: 'Error fetching bailers' });
        return;
      }

      // Combine drivers and bailers
      const employees = [...drivers, ...bailers];
      res.json(employees);
    });
  });
};

const getInactiveEmployees = (req, res) => {
  // Queries to fetch all drivers and bailers
  const query1 = 'SELECT drivers.driver_id AS id, drivers.user_id, drivers.firstname, drivers.lastname, users.email, drivers.phone, drivers.status, drivers.address, DATE_FORMAT(drivers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(drivers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, drivers.admin_id, drivers.user_id, users.role FROM drivers LEFT JOIN users ON drivers.user_id = users.user_id WHERE drivers.status = "inactive"';

  const query2 = 'SELECT bailers.bailer_id AS id, bailers.user_id, bailers.firstname, bailers.lastname, users.email, bailers.phone, bailers.address, bailers.status, DATE_FORMAT(bailers.created_at, "%Y-%m-%d") AS created_at, DATE_FORMAT(bailers.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at, bailers.admin_id, bailers.user_id, users.role FROM bailers LEFT JOIN users ON bailers.user_id = users.user_id WHERE bailers.status = "inactive"';

  db.query(query1, (err1, drivers) => {
    if (err1) {
      console.error('Error fetching drivers: ', err1);
      res.status(500).json({ error: 'Error fetching drivers' });
      return;
    } 

    db.query(query2, (err2, bailers) => {
      if (err2) {
        console.error('Error fetching bailers: ', err2);
        res.status(500).json({ error: 'Error fetching bailers' });
        return;
      }

      // Combine drivers and bailers
      const employees = [...drivers, ...bailers];
      res.json(employees);
    });
  });
};


export { getBailer, getEmployee, addEmployee, changeStatus, getEmployeesFromUsers, getActiveEmployees, getInactiveEmployees, changeStatusActive };
