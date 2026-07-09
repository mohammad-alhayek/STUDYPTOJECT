import express from "express";
import path from "path";
import routes from "./routes/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { languageMiddleware } from "./middlewares/langMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(languageMiddleware);

app.use("/api", routes);

//  Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const translatedMessage = req.__ ? req.__(err.message) : err.message;

  res.status(statusCode).json({
    status: "fail",
    message: translatedMessage,
  });
});

connectDB();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
