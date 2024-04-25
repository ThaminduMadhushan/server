// import bcrypt from "bcrypt";
// import db from "../connect.js";

// export const register = (req, res) => {
//   const q = "SELECT * FROM users WHERE firstname = ?";

//   db.query(q, [req.body.username], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) return res.status(409).json("User already exists!");

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const insertQuery =
//       "INSERT INTO users (`firstname`, `lastname`, `email`,`password`) VALUES (?)";
//     const values = [
//       req.body.firstname,
//       req.body.lastname,
//       req.body.email,
//       hash,
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
//           // if (response) {
//           //   req.session.email = data[0].email;
//           //   return res.json({ Login: true });
//           // } else {
//           //   return res.json({ error: "Wrong password" });
//           // }
//           if (response) {
//             req.session.user = {
//               id: data[0].id,
//               firstname: data[0].firstname,
//               email: data[0].email
//             };
//             return res.json({ Login: true, user: req.session.user });
//           }
//         }
//       );
//     } else {
//       return res.json({ Login: false });
//     }
//   });
// };

// export const logout = (req, res) => {
//   res
//     .clearCookie("access_token", {
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .json("User has been logged out.");
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

    const insertQuery =
      "INSERT INTO users (`firstname`, `lastname`, `email`,`password`) VALUES (?)";
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hash,
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.json({ error: "Error for fetching" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.json({ error: "password comparison error" });
          }
         
          if (response) {
            req.session.user = {
              id: data[0].id,
              firstname: data[0].firstname,
              email: data[0].email
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
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json("User has been logged out.");
  });
};
