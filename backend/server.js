import express from "express";
import { config as configDotenv } from "dotenv";
import { connectdb } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

configDotenv();

const port = process.env.PORT || 5500;
const app = express();

// Add these middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  next();
});

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong", 
    error: err.message 
  });
});

// Start server
app.listen(port, () => {
  connectdb();
  console.log(`Server started running at port ${port}`);
});