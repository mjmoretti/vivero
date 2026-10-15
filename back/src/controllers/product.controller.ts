import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.service";
import { uploadImageService } from "../services/cloudinary.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const products = await getProductsService(search, categoryId);
    res.json(products);
  }
);

export const createProduct = catchedController(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const { name, description, price, stock, categoryId } = req.body;

    if (!req.file) {
      res.status(400).send({ message: "La imagen es requerida" });
      return;
    }

    const imageUrl = await uploadImageService(req.file.path);
    const product = await createProductService({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
      image: imageUrl,
    });
    res.status(201).json(product);
  }
);

export const updateProduct = catchedController(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const id = Number(req.params.id);
    const { name, description, price, stock, categoryId } = req.body;

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImageService(req.file.path);
    }

    const product = await updateProductService(id, {
      name,
      description,
      price: price ? Number(price) : undefined,
      stock: stock ? Number(stock) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      image: imageUrl,
    });
    res.json(product);
  }
);

export const deleteProduct = catchedController(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteProductService(id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  }
);