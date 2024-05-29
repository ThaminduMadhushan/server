// middleware/authMiddleware.js
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).json({ authenticated: false, message: "User not authenticated" });
    }
  };
  