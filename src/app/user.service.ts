import { Injectable } from '@angular/core';
import { User } from './user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public api: ApiService) { }

  getUsers() {
    return this.api.get('users/');
  }

  register(user: User) {
    return this.api.post('api/auth/register', user);
  }

  login(email: string, password: string) {
    return this.api.post(
      'api/auth/login',
      {
        email: email,
        password: password
      }
    );
  }
}
