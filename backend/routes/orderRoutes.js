import express from "express";
const orderRouter = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { authenticate, admin } from "../middleware/authMiddleware.js";

orderRouter
  .route("/")
  .post(authenticate, addOrderItems)
  .get(authenticate, admin, getOrders);
orderRouter.route("/mine").get(authenticate, getMyOrders);
orderRouter.route("/:id").get(authenticate, getOrderById);
orderRouter.route("/:id/pay").put(authenticate, updateOrderToPaid);
orderRouter
  .route("/:id/deliver")
  .put(authenticate, admin, updateOrderToDelivered);

export default orderRouter;
