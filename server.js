import express from "express";
import path from "path";
import routes from "./routes/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { languageMiddleware } from "./middlewares/langMiddleware.js";
import pages from "./routes/pages.js";

import { errorHandler } from "./middlewares/errorHandler.js";

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

// Frontend static files
app.use(express.static("public"));

// Pages Routes
app.use("/", pages);

// API Routes
app.use("/api", routes);

// Error Handler لازم يكون آخر middleware
app.use(errorHandler);

connectDB();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
