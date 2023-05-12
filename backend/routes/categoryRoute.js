import express from "express"
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { isAdmin, requiredSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router()

// routes

// create category
router.post('/create-category', requiredSignIn, isAdmin, createCategoryController)

// update category
router.put('/update-category/:id', requiredSignIn, isAdmin, updateCategoryController)

// getall category
router.get('/categories', categoryController)

// single category
router.get('/single-category/:slug', singleCategoryController)

// delete category
router.delete('/delete-category/:id', requiredSignIn,isAdmin, deleteCategoryController)


export default router