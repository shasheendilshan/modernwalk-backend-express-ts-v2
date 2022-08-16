import { fileWriter } from "./../helpers/JsonChange.helper";
import find from "../helpers/find.helper";
import { v4 as uuidv4 } from "uuid";
import { ICategory, INewCategory } from "./../interfaces/category.interface";

export class CategoriesService {
  dataSource: ICategory[];

  constructor(dataSource: ICategory[]) {
    this.dataSource = dataSource;
  }

  getAllCategories(tenantId: any): ICategory[] {
    return this.dataSource.filter(
      (category: ICategory) => category.tenantId === tenantId
    );
  }

  getCategoryById(id: string) {
    return this.dataSource.find((category: ICategory) => category.id === id);
  }
  getCategoryByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (category: ICategory) =>
        category.id === id && category.tenantId === tenantId
    );
  }

  deleteCategoryById(id: string) {
    const newCategoryList = this.dataSource.filter(
      (category: ICategory) => category.id !== id
    );
    fileWriter("./src/mocks/categories.json", newCategoryList);

    return newCategoryList;
  }

  addCategory(category: INewCategory) {
    let allCategories: ICategory[] = this.dataSource;
    let newCategory: ICategory = {
      id: uuidv4(),
      name: category?.name,
      tenantId: category?.tenantId,
    };
    allCategories.push(newCategory);
    fileWriter("./src/mocks/categories.json", allCategories);
    return newCategory;
  }

  updateCategory(updateCategory: ICategory) {
    let allCategories: ICategory[] = this.dataSource.filter(
      (category: ICategory) => category.id !== updateCategory.id
    );
    allCategories.push(updateCategory);
    fileWriter("./src/mocks/categories.json", allCategories);
    return updateCategory;
  }
}
