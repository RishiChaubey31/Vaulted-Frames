import express from "express";
import multer from "multer";
import {
  deleteProducts,
  getProducts,
  postProducts,
  updateProducts,
} from "../controller/product.controller.js";

// More robust multer configuration
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
}).single("image");

const router = express.Router();

// Wrap route with error handling middleware
router.post("/", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ 
        success: false, 
        message: "File upload error",
        error: err.message 
      });
    }
    next();
  });
}, postProducts);

router.get("/", getProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", upload, updateProducts);

export default router;