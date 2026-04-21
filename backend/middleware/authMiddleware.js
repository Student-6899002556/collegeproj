import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  } else {
    return res.status(401).json({ msg: "No token" });
  }
};

export default protect;