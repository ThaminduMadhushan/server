// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import session from "express-session";
// import bodyParser from "body-parser";

// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";
// import productRoutes from './routes/product.js';

// const app = express();

// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));
// app.use(cookieParser());
// app.use(bodyParser.json());

// app.use(session({
//     secret: "secretcode",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000
//     }
// }));

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/products', productRoutes);


// app.get("/", (req, res) => {
//     if(req.session.email) {
//         res.send({ valid: true, user: req.session.email });
//     } else {
//         res.send({ valid: false });
//     }
// });


// app.listen(3001, () => {
//     console.log("Server started on port 3001");
// });

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import session from "express-session";
// import bodyParser from "body-parser";

// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";
// import productRoutes from './routes/product.js';

// const app = express();

// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));
// app.use(cookieParser());
// app.use(bodyParser.json());

// app.use(session({
//     secret: "secretcode",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000
//     }
// }));

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/products', productRoutes);

// // Route to check if the user is authenticated
// app.get("/api/auth/authenticated", (req, res) => {
//     if(req.session.user) {
//         res.json({ authenticated: true, user: req.session.user });
//     } else {
//         res.json({ authenticated: false });
//     }
// });

// app.listen(3001, () => {
//     console.log("Server started on port 3001");
// });


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import materialRoutes from './routes/materials.js';

const app = express();
// ser
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/materials', materialRoutes);

// Route to check if the user is authenticated
app.get("/api/auth/authenticated", (req, res) => {
    if(req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});

