import { fileWriter } from "./../helpers/JsonChange.helper";
import { v4 as uuidv4 } from "uuid";
import { IUser, INewUser } from "../interfaces/user.interface";

export class UsersService {
  dataSource: IUser[];

  constructor(dataSource: IUser[]) {
    this.dataSource = dataSource;
  }

  getAllUsers(tenantId: any): IUser[] {
    return this.dataSource.filter((user: IUser) => user.tenantId === tenantId);
  }

  getUserById(id: string) {
    return this.dataSource.find((user: IUser) => user.id === id);
  }
  getUserByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (user: IUser) => user.id === id && user.tenantId === tenantId
    );
  }

  deleteUserById(id: string) {
    const newUserList = this.dataSource.filter((user: IUser) => user.id !== id);
    fileWriter("./src/mocks/users.json", newUserList);

    return newUserList;
  }

  addUser(user: INewUser) {
    let allUsers: IUser[] = this.dataSource;
    let newUser: IUser = {
      id: uuidv4(),
      tenantId: user.tenantId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    allUsers.push(newUser);
    fileWriter("./src/mocks/users.json", allUsers);
    return newUser;
  }
}
