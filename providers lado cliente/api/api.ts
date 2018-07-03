import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  private readonly wsBaseUrl = 'http://ec2-18-231-119-111.sa-east-1.compute.amazonaws.com';

  constructor(public http: HttpClient) { }

  public post(endpoint: string, data: any, token?: string) {
    if (token)
      return this.http.post(`${this.wsBaseUrl}/${endpoint}`, data, {headers: new HttpHeaders().set('x-api-key', token)});
    return this.http.post(`${this.wsBaseUrl}/${endpoint}`, data);
  }

  public get(endpoint: string, token?: string) {
    if (token)
      return this.http.get(`${this.wsBaseUrl}/${endpoint}`, {headers: new HttpHeaders().set('x-api-key', token)});
    return this.http.get(`${this.wsBaseUrl}/${endpoint}`);
  }

}
