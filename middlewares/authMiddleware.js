import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("USER:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};
