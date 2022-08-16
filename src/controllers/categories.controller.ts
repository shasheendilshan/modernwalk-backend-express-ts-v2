import { Get, Route, Query, Tags, Delete, Post, Body, Put } from "tsoa";

import categories from "../mocks/categories.json";
import { CategoriesService } from "./../services/categories.service";
import { ICategory, INewCategory } from "./../interfaces/category.interface";

@Route("api/v1/categories")
@Tags("Categories")
export default class CategoriesController {
  categoriesDataSource;
  categoriesService;

  constructor() {
    this.categoriesDataSource = categories;
    this.categoriesService = new CategoriesService(this.categoriesDataSource);
  }

  @Get("/")
  public getAllCategories(@Query() tenantId: any): ICategory[] {
    return this.categoriesService.getAllCategories(tenantId);
  }

  @Get("/:id")
  public getCategoriesById(@Query() tenantId: any, id: string) {
    return this.categoriesService.getCategoryByIdForTenant(id, tenantId);
  }

  @Delete("/:id")
  public deleteCategoryById(id: string) {
    return this.categoriesService.deleteCategoryById(id);
  }
  @Put("/:id")
  public updateCategory(@Body() category: ICategory) {
    if (category.id && category.tenantId) {
      const checkCategory = this.categoriesService.getCategoryByIdForTenant(
        category.id,
        category.tenantId
      );
      if (checkCategory) {
        return this.categoriesService.updateCategory(category);
      } else {
        return {
          message: "no category found for this id",
        };
      }
    }
  }
  @Post("/")
  public addCategory(@Body() category: INewCategory) {
    return this.categoriesService.addCategory(category);
  }
}
