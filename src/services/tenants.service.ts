import { fileWriter } from "./../helpers/JsonChange.helper";
import { v4 as uuidv4 } from "uuid";
import { ITenant, INewTenant } from "./../interfaces/tenant.interface";
import defaultTheme from "../mocks/defaultTheme.json";

export class TenantsService {
  dataSource: ITenant[];

  constructor(dataSource: ITenant[]) {
    this.dataSource = dataSource;
  }

  getAllTenants(): ITenant[] {
    return this.dataSource;
  }

  getTenantById(id: string) {
    return this.dataSource.find((tenant: ITenant) => tenant.id === id);
  }

  deleteTenantById(id: string) {
    const newTenantList = this.dataSource.filter(
      (tenant: ITenant) => tenant.id !== id
    );
    fileWriter("./src/mocks/tenants.json", newTenantList);

    return newTenantList;
  }

  addTenant(Tenant: INewTenant) {
    let allTenants: ITenant[] = this.dataSource;
    let newTenant: ITenant = {
      id: uuidv4(),
      name: Tenant.name,
      theme: Tenant.theme ? Tenant.theme : defaultTheme,
    };
    allTenants.push(newTenant);
    fileWriter("./src/mocks/tenants.json", allTenants);
    return newTenant;
  }
}
