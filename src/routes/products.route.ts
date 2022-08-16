import express, { Request, Response } from "express";
import ProductsController from "../controllers/products.controller";

const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  return res.json(productsController.getAllProducts(tenantId));
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;

  return res.json(productsController.getProductById(tenantId, id));
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(productsController.deleteProductById(id));
});

productsRouter.post("/", (req: Request, res: Response) => {
  const { title, price, image } = req.body;
  if (!title || !price || !image)
    return res.json({ message: "title price and product image required" });
  return res.json(productsController.addProduct(req.body));
});

export default productsRouter;
