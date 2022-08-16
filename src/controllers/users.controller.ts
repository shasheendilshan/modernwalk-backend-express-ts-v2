import { Get, Route, Query, Tags, Delete, Post, Body } from "tsoa";

import users from "../mocks/users.json";
import { UsersService } from "./../services/users.service";
import { INewUser, IUser } from "./../interfaces/user.interface";

@Route("api/v1/users")
@Tags("Users")
export default class UsersController {
  usersDataSource;
  usersService;

  constructor() {
    this.usersDataSource = users;
    this.usersService = new UsersService(this.usersDataSource);
  }

  @Get("/")
  public getAllUsers(@Query() tenantId: any): IUser[] {
    return this.usersService.getAllUsers(tenantId);
  }

  @Get("/:id")
  public getUsersById(@Query() tenantId: any, id: string) {
    return this.usersService.getUserByIdForTenant(id, tenantId);
  }

  @Delete("/:id")
  public deleteUserById(id: string) {
    return this.usersService.deleteUserById(id);
  }

  @Post("/")
  public addUser(@Body() user: INewUser) {
    return this.usersService.addUser(user);
  }
}
