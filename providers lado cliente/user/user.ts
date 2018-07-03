import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { User } from '../../models/user';

/**
 * Classe responsável por definir os atributos do objeto UserProvider
 * @returns {Void}
 */
@Injectable()
export class UserProvider {

  _token: string = undefined;
  _user: User = { email: '', password: '' }

  constructor(public api: ApiProvider) {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user')
    if (user) 
      this._user = JSON.parse(user)
    if (token)
      this._token = token
  }

  get token(): string {
    return this.token
  }

  set token(token) {
    localStorage.setItem('token', token)
    this._token = token
  }

  get user(): User {
    return this._user
  }

  set user(user) {
    localStorage.setItem('user', JSON.stringify(user))
    this._user = user
  }

  public isAuthenticated() {
    return this._token != undefined;
  }

  public logout() {
    this._user = undefined
    this._token = undefined
    localStorage.clear()
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

  /**
   * Testa se um e-mail está no formato válido
   * @param email email que será testado
   */
  public validateEmail(email: string): boolean {
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    return regex.test(email)
  }
}
