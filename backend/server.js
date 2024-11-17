import express from "express";
import { config as configDotenv } from "dotenv";
import { connectdb } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
configDotenv();

const port = process.env.PORT || 5500;
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);


app.listen(port, () => {
  connectdb();
  console.log(`server started running at ${port}`);
});

