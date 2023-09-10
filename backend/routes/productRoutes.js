import express from "express";
const productRouter = express.Router();
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, authenticate } from "../middleware/authMiddleware.js";

productRouter.get("/", getProducts);
productRouter.post("/", authenticate, admin, createProduct);

productRouter.get("/:id", getProductById);
productRouter.put("/:id", authenticate, admin, updateProduct);
productRouter.delete("/:id", authenticate, admin, deleteProduct);

export default productRouter;
