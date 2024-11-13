import express from "express";
import { config as configDotenv } from "dotenv";
import { connectdb } from "./config/db.js";
import Product from "./models/product.model.js";


configDotenv();

const port = 5000;
const app = express();
app.use(express.json());

app.post("/api/products", async(req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image){
    return res
    .status(400)
    .json({ success: false, message: "Fill all the fields required" });
  }
   const newProduct=new Product(product);

   try{
    await newProduct.save();
    res.status(201).json({success:true,data:newProduct});
   }catch(error){
    console.log("Error in saving product",error.message);
    res.status(500).json({success:false,message:"Server error"});
   }
});

app.listen(port, () => {
  connectdb();
  console.log(`server started running at ${port}`);
});
