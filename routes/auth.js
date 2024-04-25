// import express from "express";
// import { login, register, logout } from "../controllers/auth.js";


// const router = express.Router();

// router.post("/login", login);
// router.post("/signup", register);
// router.post("/logout", logout);

// export default router

// import express from "express";
// import { login, register, logout } from "../controllers/auth.js";

// const router = express.Router();

// // Existing routes for login, register, and logout
// router.post("/login", login);
// router.post("/signup", register);
// router.post("/logout", logout);

// // New route to check if the user is authenticated and return the email
// router.get("/authenticated", (req, res) => {
//     if(req.session.email) {
//         res.json({ authenticated: true, email: req.session.email });
//     } else {
//         res.json({ authenticated: false });
//     }
// });

// export default router;


import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

// Existing routes for login, register, and logout
router.post("/login", login);
router.post("/signup", register);
router.post("/logout", logout);

// New route to check if the user is authenticated and return the email
router.get("/authenticated", (req, res) => {
    if(req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

export default router;
