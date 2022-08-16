import express, { Request, Response } from "express";
import UsersController from "./../controllers/users.controller";

const usersRouter = express.Router();
const userController = new UsersController();

usersRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  return res.json(userController.getAllUsers(tenantId));
});

usersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;

  return res.json(userController.getUsersById(tenantId, id));
});

usersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(userController.deleteUserById(id));
});

usersRouter.post("/", (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.json({ message: "missing required field." });
  return res.json(userController.addUser(req.body));
});

export default usersRouter;
