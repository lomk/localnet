import {Provider}   from '../provider/provider';
import {Role}       from '../role/role';

export class User {
    id: number;
    username: String;
    password: String;
    confirmPassword: String;
    role: Role;
    provider: Provider;
}
