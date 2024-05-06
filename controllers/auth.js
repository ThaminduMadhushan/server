// import bcrypt from "bcrypt";
// import db from "../connect.js";

// export const register = (req, res) => {
//   const q = "SELECT * FROM users WHERE email = ?";

//   db.query(q, [req.body.email], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) return res.status(409).json("User already exists!");

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const insertQuery =
//       "INSERT INTO users (`firstname`, `lastname`, `email`,`password`, `role`) VALUES (?)";
//     const values = [
//       req.body.firstname,
//       req.body.lastname,
//       req.body.email,
//       hash,
//       req.body.role,
//     ];

//     db.query(insertQuery, [values], (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// };

// export const login = (req, res) => {
//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [req.body.email], (err, data) => {
//     if (err) {
//       return res.json({ error: "Error for fetching" });
//     }
//     if (data.length > 0) {
//       bcrypt.compare(
//         req.body.password.toString(),
//         data[0].password,
//         (err, response) => {
//           if (err) {
//             return res.json({ error: "password comparison error" });
//           }
         
//           if (response) {
//             req.session.user = {
//               id: data[0].id,
//               firstname: data[0].firstname,
//               email: data[0].email
//             };
//             return res.json({ Login: true, user: req.session.user });
//           }
//           return res.json({ Login: false });
//         }
//       );
//     } else {
//       return res.json({ Login: false });
//     }
//   });
// };

// export const logout = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Logout failed" });
//     }
//     res.clearCookie("connect.sid");
//     res.status(200).json("User has been logged out.");
//   });
// };

import bcrypt from "bcrypt";
import db from "../connect.js";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery =
      "INSERT INTO users (`email`,`password`, `role`) VALUES (?, ?, ?)";
    const userValues = [
      req.body.email,
      hash,
      req.body.role,
    ];

    db.query(insertUserQuery, userValues, (err, userResult) => {
      if (err) return res.json(err);
      const userid = userResult.insertId;

      let insertRoleSpecificQuery;
      let roleSpecificValues;

      switch (req.body.role) {
        case 'admin':
          insertRoleSpecificQuery = `INSERT INTO admins (user_id, firstname, lastname) VALUES (?, ?, ?)`;
          roleSpecificValues = [userid, req.body.firstname, req.body.lastname,];
          break;
        case 'customer':
          insertRoleSpecificQuery = `INSERT INTO customers (user_id, firstname, lastname) VALUES (?, ?, ?)`;
          roleSpecificValues = [userid, req.body.firstname, req.body.lastname,];
          break;
        case 'supplier':
          insertRoleSpecificQuery = `INSERT INTO suppliers user_id, firstname, lastname) VALUES (?, ?, ?)`;
          roleSpecificValues = [userid, req.body.firstname, req.body.lastname,];
          break;
        default:
          return res.status(400).json("Invalid role");
      }

      db.query(insertRoleSpecificQuery, roleSpecificValues, (err) => {
        if (err) return res.json(err);
        return res.status(200).json("User registered successfully.");
      });
    });
  });
};

export const login = (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.json({ error: "Error fetching user data" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.json({ error: "Password comparison error" });
          }
          if (response) {
            req.session.user = {
              id: data[0].user_id,
              email: data[0].email,
              role: data[0].role
            };
            return res.json({ Login: true, user: req.session.user });
          }
          return res.json({ Login: false });
        }
      );
    } else {
      return res.json({ Login: false });
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ error: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
};
