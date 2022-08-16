import { Get, Route, Query, Tags, Delete, Post, Body } from "tsoa";
import tenants from "../mocks/tenants.json";
import { TenantsService } from "./../services/tenants.service";
import { INewTenant, ITenant } from "./../interfaces/tenant.interface";

@Route("api/v1/tenants")
@Tags("Tenants")
export default class TenantsController {
  tenantsDataSource;
  tenantsService;

  constructor() {
    this.tenantsDataSource = tenants;
    this.tenantsService = new TenantsService(this.tenantsDataSource);
  }

  @Get("/")
  public getAllTenants(): ITenant[] {
    return this.tenantsService.getAllTenants();
  }

  @Get("/:id")
  public getTenantsById(id: string) {
    return this.tenantsService.getTenantById(id);
  }

  @Delete("/:id")
  public deleteTenantById(id: string) {
    return this.tenantsService.deleteTenantById(id);
  }

  @Post("/")
  public addTenant(@Body() tenant: INewTenant) {
    return this.tenantsService.addTenant(tenant);
  }
}
