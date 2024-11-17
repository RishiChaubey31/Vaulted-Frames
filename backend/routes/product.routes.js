import express from "express";

import {
  deleteProducts,
  getProducts,
  postProducts,
  updateProducts,
} from "../controller/product.controller.js";
const router = express.Router();

router.post("/", postProducts);

router.get("/", getProducts);

router.delete("/:id", deleteProducts);

router.put("/:id", updateProducts);

export default router;
