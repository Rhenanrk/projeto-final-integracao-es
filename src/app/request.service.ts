import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  user: User;

  constructor(public api: ApiService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public getAllRequests() {
    return this.api.get('requests/', this.user.token);
  }
}
