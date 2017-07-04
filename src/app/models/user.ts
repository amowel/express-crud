import {Role} from 'app/models/role.enum';

export class User {
  constructor(
    public _id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public date?: string,
    public password?: string,
    public role?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.date = date;
    this.password = password;
    this.role = role;
    this._id = _id;
  }
}
