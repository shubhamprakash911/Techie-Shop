import express from "express";
const productRouter = express.Router();
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { admin, authenticate } from "../middleware/authMiddleware.js";

productRouter.get("/", getProducts);
productRouter.post("/", authenticate, admin, createProduct);

productRouter.get("/:id", getProductById);

export default productRouter;
