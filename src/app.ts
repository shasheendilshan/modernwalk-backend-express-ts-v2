import express, { Request, Response } from "express";
import categoriesRouter from "./routes/categories.route";
import productsRouter from "./routes/products.route";
import tenantsRouter from "./routes/tenants.route";
import usersRouter from "./routes/users.router";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/tenants", tenantsRouter);
app.use("/api/v1/users", usersRouter);

app.use(express.static("dist"));
app.use(
  "/api/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

export default app;
