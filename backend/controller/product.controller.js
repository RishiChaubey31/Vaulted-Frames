import Product from "../models/product.model.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js"; // Import pre-configured Cloudinary instance
import multer from "multer";

// Set up multer storage configuration (optional, can be used for file filtering)
const storage = multer.memoryStorage(); // Store file in memory (recommended for Cloudinary upload)

const upload = multer({ storage }).single("image"); // Handle single image upload


export const postProducts = async (req, res) => {
  try {
    console.log("Full request details:");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, price } = req.body;
    
    // Validate inputs
    if (!name || !price) {
      return res.status(400).json({ 
        success: false, 
        message: "Name and price are required" 
      });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Image is required" 
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        folder: "product_images",
      }
    );

    // Create new product
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      image: result.secure_url,
    });

    await newProduct.save();

    res.status(201).json({ 
      success: true, 
      data: newProduct 
    });

  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating product", 
      error: error.message 
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product id" });
  }

  // If there's a new image, upload it to Cloudinary
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.buffer, {
        folder: "product_images", // Optional folder
      });

      // Add the Cloudinary image URL to the product
      product.image = result.secure_url;
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error uploading image" });
    }
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product not found" });
  }
};
