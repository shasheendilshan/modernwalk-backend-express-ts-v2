import express, { Request, Response } from "express";
import TenantsController from "./../controllers/tenants.controller";

const tenantsRouter = express.Router();
const tenantController = new TenantsController();

tenantsRouter.get("/", (req: Request, res: Response) => {
  return res.json(tenantController.getAllTenants());
});
tenantsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(tenantController.getTenantsById(id));
});

tenantsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(tenantController.deleteTenantById(id));
});
tenantsRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.json({ message: "Tenant name required" });
  return res.json(tenantController.addTenant(req.body));
});

export default tenantsRouter;
