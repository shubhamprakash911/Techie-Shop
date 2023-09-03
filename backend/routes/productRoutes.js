import express from "express";
const productRouter = express.Router();
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductById);

export default productRouter;
