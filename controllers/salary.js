import db from "../connect.js";

const getParameters = (req, res) => {
  const query = "SELECT * FROM salary_parameters";

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching parameters: ", err);
      res.status(500).json({ error: "Error fetching parameters" });
      return;
    }

    res.json(results);
  });
};

const addParameters = (req, res) => {

  const { role, basic_salary, epf, bonus, monthly_target, target_bonus, admin_id  } = req.body;

  // Insert the new parameters into the database
  const query =
    "INSERT INTO salary_parameters (role, basic_salary, epf, bonus, monthly_target, target_bonus, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [role, basic_salary, epf, bonus, monthly_target, target_bonus, admin_id], (err, result) => {
    if (err) {
      console.error("Error adding parameters:", err);
      res.status(500).json({ error: "Error adding parameters" });
      return;
    }

    res.status(200).json({ message: "Parameters added successfully" });
  });
};

const updateParameters = (req, res) => {

  const id = req.params.id;

  const { role, basic_salary, epf, bonus, monthly_target, target_bonus, admin_id } = req.body;

  // Update the parameters in the database
  const query = "UPDATE salary_parameters SET role = ?, basic_salary = ?, epf = ?, bonus = ?, monthly_target = ?, target_bonus = ?, admin_id = ? WHERE id = ?";
  db.query(query, [role, basic_salary, epf, bonus, monthly_target, target_bonus, admin_id, id], (err, result) => {
    if (err) {
      console.error("Error updating parameters:", err);
      res.status(500).json({ error: "Error updating parameters" });
      return;
    }

    res.status(200).json({ message: "Parameters updated successfully" });
});
};

const getUnpaidSalary = (req, res) => {
    const query = "SELECT salary.salary_id, admins.firstname AS admin_name, salary.basic_salary, salary.epf, salary.bonus, salary.full_payment, salary.total_quantity, salary.target_bonus, salary.status, salary.month, bailers.firstname AS bailer_name, drivers.firstname AS driver_name, DATE_FORMAT(salary.updated_at, '%Y-%m-%d') AS paid_date FROM salary LEFT JOIN admins ON admins.admin_id = salary.admin_id LEFT JOIN bailers ON bailers.user_id = salary.employee_id LEFT JOIN drivers ON drivers.user_id = salary.employee_id WHERE salary.status = 'unpaid'";
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching salaries: ", err);
        res.status(500).json({ error: "Error fetching salaries" });
        return;
      }
  
      res.json(results);
    });
  };

  // const saveSalary = (req, res) => {

  //   const { employee_id, admin_id, full_payment, total_quantity, target_bonus, status } = req.body;
  //   // Insert the new parameters into the database
  //   const query =
  //     "INSERT INTO salary (employee_id, admin_id, full_payment, total_quantity, target_bonus, status) VALUES (?, ?, ?, ?, ?, ?)";
  //   db.query(query, [employee_id, admin_id, full_payment, total_quantity, target_bonus, status], (err, result) => {
  //     if (err) {
  //       console.error("Error adding salaries:", err);
  //       res.status(500).json({ error: "Error adding salaries" });
  //       return;
  //     }
  
  //     res.status(200).json({ message: "Salaries added successfully" });
  //   });
  // };

  const saveSalary = (req, res) => {
    const { 
      employee_id, 
      admin_id, 
      basic_salary, 
      epf, 
      bonus, 
      monthly_target, 
      unit_target_bonus,
      target_bonus, 
      full_payment, 
      total_quantity, 
      status,
      month 
    } = req.body;
  
    // Insert the new parameters into the database
    const query = `
      INSERT INTO salary (
        employee_id, admin_id, basic_salary, epf, bonus, monthly_target, 
        target_bonus, full_payment, total_quantity, status, unit_target_bonus, month
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      employee_id, admin_id, basic_salary, epf, bonus, monthly_target, 
      target_bonus, full_payment, total_quantity, status, unit_target_bonus, month
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding salaries:", err);
        res.status(500).json({ error: "Error adding salaries" });
        return;
      }
  
      res.status(200).json({ message: "Salaries added successfully" });
    });
  };
  

  // const driverCollection = (req, res) => {
  //   const query = "SELECT users.user_id, users.role, DATE_FORMAT(collections.updated_at, '%Y-%m-%d') AS date, collections.quantity FROM users LEFT JOIN collections ON users.user_id = collections.user_id WHERE role= 'driver'";
  
  //   // Execute the query
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       console.error("Error fetching salaries: ", err);
  //       res.status(500).json({ error: "Error fetching salaries" });
  //       return;
  //     }
  
  //     res.json(results);
  //   });
  // };

  
  // const bailerCollection = (req, res) => {
  //   const query = `SELECT bd2.user_id, bd1.material_quantity AS quantity, DATE_FORMAT(bd1.updated_at, '%Y-%m-%d') AS date, users.role
  //   FROM bailing_details AS bd1
  //   LEFT JOIN bailers AS bd2 ON bd1.bailer_id = bd2.bailer_id
  //   LEFT JOIN users ON bd2.user_id = users.user_id
  //   WHERE bd1.status = 'accept'`;
  
  //   // Execute the query
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       console.error("Error fetching collections: ", err);
  //       res.status(500).json({ error: "Error fetching collections" });
  //       return;
  //     }
  
  //     res.json(results);
  //   });
  // };

  // const driverCollection = (req, res) => {
  //   const { startDate, endDate } = req.query;
  //   const query = `
  //     SELECT users.user_id, users.role, DATE_FORMAT(collections.updated_at, '%Y-%m-%d %H:%i:%s') AS date, collections.quantity, drivers.status 
  //     FROM collections 
  //     LEFT JOIN users ON collections.user_id  = users.user_id 
  //     LEFT JOIN drivers ON users.user_id = drivers.user_id
  //     WHERE role = 'driver' AND drivers.status = 'active' AND collections.updated_at BETWEEN ? AND ?
  //   `;
  
  //   db.query(query, [startDate + " 00:00:00", endDate + " 23:59:59"], (err, results) => {
  //     if (err) {
  //       console.error("Error fetching salaries: ", err);
  //       res.status(500).json({ error: "Error fetching salaries" });
  //       return;
  //     }
  
  //     res.json(results);
  //   });
  // };
  
  // const bailerCollection = (req, res) => {
  //   const { startDate, endDate } = req.query;
  //   const query = `
  //     SELECT bd2.user_id, bd1.material_quantity AS quantity, DATE_FORMAT(bd1.updated_at, '%Y-%m-%d %H:%i:%s') AS date, users.role
  //     FROM bailing_details AS bd1
  //     LEFT JOIN bailers AS bd2 ON bd1.bailer_id = bd2.bailer_id
  //     LEFT JOIN users ON bd2.user_id = users.user_id
  //     WHERE bd1.status = 'accept' AND bailers.status = 'active' AND bd1.updated_at BETWEEN ? AND ?
  //   `;
  
  //   db.query(query, [startDate + " 00:00:00", endDate + " 23:59:59"], (err, results) => {
  //     if (err) {
  //       console.error("Error fetching collections: ", err);
  //       res.status(500).json({ error: "Error fetching collections" });
  //       return;
  //     }
  
  //     res.json(results);
  //   });
  // };
  
  const driverCollection = (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `
      SELECT users.user_id, users.role, DATE_FORMAT(collections.updated_at, '%Y-%m-%d %H:%i:%s') AS date, collections.quantity, drivers.status 
      FROM collections 
      LEFT JOIN users ON collections.user_id  = users.user_id 
      LEFT JOIN drivers ON users.user_id = drivers.user_id
      WHERE role = 'driver' AND drivers.status = 'active' AND collections.updated_at BETWEEN ? AND ?
    `;
  
    db.query(query, [`${startDate} 00:00:00`, `${endDate} 23:59:59`], (err, results) => {
      if (err) {
        console.error("Error fetching salaries: ", err);
        res.status(500).json({ error: "Error fetching salaries" });
        return;
      }
  
      res.json(results);
    });
  };
  
  const bailerCollection = (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `
      SELECT bd2.user_id, bd1.material_quantity AS quantity, DATE_FORMAT(bd1.updated_at, '%Y-%m-%d %H:%i:%s') AS date, users.role
      FROM bailing_details AS bd1
      LEFT JOIN bailers AS bd2 ON bd1.bailer_id = bd2.bailer_id
      LEFT JOIN users ON bd2.user_id = users.user_id
      WHERE bd1.status = 'accept' AND bailers.status = 'active' AND bd1.updated_at BETWEEN ? AND ?
    `;
  
    db.query(query, [`${startDate} 00:00:00`, `${endDate} 23:59:59`], (err, results) => {
      if (err) {
        console.error("Error fetching collections: ", err);
        res.status(500).json({ error: "Error fetching collections" });
        return;
      }
  
      res.json(results);
    });
  };

  
  const allDriverCollection = (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `
      SELECT users.user_id, users.role, DATE_FORMAT(collections.updated_at, '%Y-%m-%d %H:%i:%s') AS date, collections.quantity, drivers.status 
      FROM collections 
      LEFT JOIN users ON collections.user_id  = users.user_id 
      LEFT JOIN drivers ON users.user_id = drivers.user_id
      WHERE role = 'driver' AND collections.updated_at BETWEEN ? AND ?
    `;
  
    db.query(query, [`${startDate} 00:00:00`, `${endDate} 23:59:59`], (err, results) => {
      if (err) {
        console.error("Error fetching salaries: ", err);
        res.status(500).json({ error: "Error fetching salaries" });
        return;
      }
  
      res.json(results);
    });
  };
  
  const allBailerCollection = (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `
      SELECT bd2.user_id, bd1.material_quantity AS quantity, DATE_FORMAT(bd1.updated_at, '%Y-%m-%d %H:%i:%s') AS date, users.role
      FROM bailing_details AS bd1
      LEFT JOIN bailers AS bd2 ON bd1.bailer_id = bd2.bailer_id
      LEFT JOIN users ON bd2.user_id = users.user_id
      WHERE bd1.status = 'accept' AND bd1.updated_at BETWEEN ? AND ?
    `;
  
    db.query(query, [`${startDate} 00:00:00`, `${endDate} 23:59:59`], (err, results) => {
      if (err) {
        console.error("Error fetching collections: ", err);
        res.status(500).json({ error: "Error fetching collections" });
        return;
      }
  
      res.json(results);
    });
  };
  
  const getPaidSalary = (req, res) => {
    const query = "SELECT admins.firstname AS admin_name, salary.basic_salary, salary.epf, salary.bonus, salary.full_payment, salary.total_quantity, salary.target_bonus, salary.status, salary.month, bailers.firstname AS bailer_name, drivers.firstname AS driver_name, DATE_FORMAT(salary.updated_at, '%Y-%m-%d') AS paid_date FROM salary LEFT JOIN admins ON admins.admin_id = salary.admin_id LEFT JOIN bailers ON bailers.user_id = salary.employee_id LEFT JOIN drivers ON drivers.user_id = salary.employee_id WHERE salary.status = 'paid'";
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching salaries: ", err);
        res.status(500).json({ error: "Error fetching salaries" });
        return;
      }
  
      res.json(results);
    });
  };

  const updatePaymentStatus = (req, res) => {
    const salary_id = req.params.id;
    const { status, adminId } = req.body;
    const query = "UPDATE salary SET status = ?, admin_id = ? WHERE salary_id = ?";
  
    // Execute the query
    db.query(query, [status, adminId, salary_id], (err, results) => {
      if (err) {
        console.error("Error updating payment status: ", err);
        res.status(500).json({ error: "Error updating payment status" });
        return;
      }
  
      res.json({ message: "Payment status updated successfully" });
    });
  };


export { getParameters, addParameters, updateParameters, getUnpaidSalary, saveSalary, driverCollection, bailerCollection, allDriverCollection, allBailerCollection, getPaidSalary, updatePaymentStatus };
