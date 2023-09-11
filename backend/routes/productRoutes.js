import express from "express";
const productRouter = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, authenticate } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

productRouter.get("/", getProducts);
productRouter.get("/top", getTopProducts);
productRouter.post("/", authenticate, admin, createProduct);

productRouter.get("/:id", checkObjectId, getProductById);
productRouter.put("/:id", authenticate, admin, checkObjectId, updateProduct);
productRouter.delete("/:id", authenticate, admin, checkObjectId, deleteProduct);
productRouter.post(
  "/:id/reviews",
  authenticate,
  checkObjectId,
  createProductReview
);

export default productRouter;
