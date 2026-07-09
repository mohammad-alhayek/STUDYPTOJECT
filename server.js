import express from "express";
import path from "path";
import routes from "./routes/index.js";
import pages from "./routes/pages.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  console.log("server started");
});
