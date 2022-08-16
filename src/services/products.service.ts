import { IProduct, INewProduct } from "./../interfaces/product.interface";
import { v4 as uuidv4 } from "uuid";
import { fileWriter } from "./../helpers/JsonChange.helper";

export class ProductsService {
  dataSource: IProduct[];

  constructor(dataSource: IProduct[]) {
    this.dataSource = dataSource;
  }

  getAllProducts(tenantId: any): IProduct[] {
    return this.dataSource.filter(
      (product: IProduct) => product.tenantId === tenantId
    );
  }

  getProductById(id: string) {
    return this.dataSource.find((product: IProduct) => product.id === id);
  }

  getProductByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (product: IProduct) => product.id === id && product.tenantId === tenantId
    );
  }

  deleteProductById(id: string) {
    const newProductList = this.dataSource.filter(
      (product: IProduct) => product.id !== id
    );
    fileWriter("./src/mocks/products.json", newProductList);

    return newProductList;
  }

  addProduct(product: INewProduct) {
    let allCategories: IProduct[] = this.dataSource;
    let newProduct: IProduct = {
      id: uuidv4(),
      tenantId: product.tenantId,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    };
    allCategories.push(newProduct);
    fileWriter("./src/mocks/products.json", allCategories);
    return newProduct;
  }
}
