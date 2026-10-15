import { Router } from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getProducts);
router.post("/", checkLogin, upload.single("image"), createProduct);
router.patch("/:id", checkLogin, upload.single("image"), updateProduct);
router.delete("/:id", checkLogin, deleteProduct);

export default router;
