import express from "express"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js"
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js"
import formidable from "express-formidable"

const router = express.Router()

// routes
// create products
router.post("/create-product", requiredSignIn, isAdmin, formidable(), createProductController)

// get products
router.get("/get-product", getProductController)

// single product
router.get("/single-product/:slug", getSingleProductController)

// get photo 
router.get("/product-photo/:pid", productPhotoController)

// delete product
router.delete("/delete-product/:pid", deleteProductController)

// update product
router.put("/update-product/:pid", requiredSignIn, isAdmin, formidable(), updateProductController)

// filter product
router.post('/product-filters', productFilterController)

// product count
router.get("/product-count", productCountController)

// product per page
router.get("/product-list/:page", productListController)

// search product
router.get("/search/:keyword", searchProductController)

// similar products
router.get("/related-product/:pid/:cid", relatedProductController)

// category wise product
router.get("/product-category/:slug", productCategoryController)

// payment routes
// token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requiredSignIn, brainTreePaymentController);



export default router