import express, { Request, Response } from "express";
import CategoriesController from "./../controllers/categories.controller";

const categoriesRouter = express.Router();
const categoriesController = new CategoriesController();

categoriesRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  return res.json(categoriesController.getAllCategories(tenantId));
});
categoriesRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  return res.json(categoriesController.getCategoriesById(tenantId, id));
});

categoriesRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(categoriesController.deleteCategoryById(id));
});
categoriesRouter.put("/:id", (req: Request, res: Response) => {
  const { name, id, tenantId } = req.body;
  if (!name || !id || !tenantId) return res.json({ message: "invalid data" });
  return res.json(categoriesController.updateCategory(req.body));
});
categoriesRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.json({ message: "category name required" });
  return res.json(categoriesController.addCategory(req.body));
});

export default categoriesRouter;
