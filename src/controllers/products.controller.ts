import { Get, Route, Query, Tags, Delete, Post, Body } from "tsoa";
import products from "../mocks/products.json";
import { ProductsService } from "../services/products.service";
import { INewProduct, IProduct } from "./../interfaces/product.interface";

@Route("api/v1/products")
@Tags("Products")
export default class ProductsController {
  productsDataSource;
  productsService;

  constructor() {
    this.productsDataSource = products;
    this.productsService = new ProductsService(this.productsDataSource);
  }

  @Get("/")
  public getAllProducts(@Query() tenantId: any) {
    return this.productsService.getAllProducts(tenantId);
  }

  @Get("/:id")
  public getProductById(@Query() tenantId: any, id: string) {
    return this.productsService.getProductByIdForTenant(id, tenantId);
  }
  @Delete("/:id")
  public deleteProductById(id: string) {
    return this.productsService.deleteProductById(id);
  }

  @Post("/")
  public addProduct(@Body() product: INewProduct) {
    return this.productsService.addProduct(product);
  }
}
