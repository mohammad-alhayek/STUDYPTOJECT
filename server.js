import express from "express";
import routes from "./routes/index.js";
import pages from "./routes/pages.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { languageMiddleware } from "./middlewares/langMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static("public"));

// Language
app.use(languageMiddleware);

// API Routes
app.use("/api", routes);

// Pages Routes
app.use("/", pages);

// Global Error Handler (must be last)
app.use(errorHandler);

connectDB();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
