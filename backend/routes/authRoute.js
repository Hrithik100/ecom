import express from "express";
import {
    protectedController,
  registerController,
  testController,
  forgotPasswordController,
  adminProtectedController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusCOntroller
} from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "./../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// register || method post
router.post("/register", registerController);

// login || method post
router.post("/login", loginController);

// forgot password || method post
router.post("/forgot-password", forgotPasswordController)

// test routes
router.get("/test", requiredSignIn, isAdmin, testController);

//  user protected route
router.get("/user-auth", requiredSignIn, protectedController);

//  admin protected route
router.get("/admin-auth", requiredSignIn, isAdmin, adminProtectedController);

// update profile
router.put("/profile", requiredSignIn, updateProfileController)

// orders
router.get("/orders", requiredSignIn, getOrdersController)

//all orders
router.get("/all-orders", requiredSignIn, isAdmin,getAllOrdersController)

// order status update
router.put("/order-status/:orderId", requiredSignIn, isAdmin, orderStatusCOntroller)

export default router;
