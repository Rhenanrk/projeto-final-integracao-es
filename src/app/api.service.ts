import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly wsBaseUrl = 'http://192.168.1.114:8080';

  constructor(public http: HttpClient) { }

  public post(endpoint: string, data: any) {
    return this.http.post(`${this.wsBaseUrl}/${endpoint}`, data);
  }

  public get(endpoint: string, token?: string) {
    if (token) {
      return this.http.get(`${this.wsBaseUrl}/${endpoint}`, {headers: new HttpHeaders().set('x-api-key', token)});
    }
    return this.http.get(`${this.wsBaseUrl}/${endpoint}`);
  }
}
