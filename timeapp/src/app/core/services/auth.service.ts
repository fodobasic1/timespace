import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerResponseData } from '../models/serverResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected _headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string, timeapiguid: string): Observable<any> {

    const object = {
      userName: userName,
      password: password,
      sid: null
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'SpicaToken ' + timeapiguid);
    const url = `${environment.apiUrl}Session/GetSession`;
    localStorage.setItem('apiguid', timeapiguid);
    return this.http.post<any>(url, object, { 'headers': headers });
  }

  convertToServerRespose(_data: ServerResponseData) {
    const data = new ServerResponseData();

    data.UserId = _data.UserId;
    data.Username = _data.Username;
    data.TokenTimeStamp = _data.TokenTimeStamp;
    data.Token = _data.Token;

    return data;
  }

  setUserDataLocalStorage(token: string) {
    localStorage.setItem('usertoken', JSON.stringify(token));
  }

  fethcUserFromLocalStorage() {
    const userData = localStorage.getItem('usertoken');

    if(userData != undefined) {
      const parsedData = JSON.parse(userData);
      const user = new ServerResponseData();
      user.Token = parsedData.Token;

      return user;
    }

    return null as any;
  }

  logout() {
    localStorage.removeItem('apiguid');
    localStorage.removeItem('usertoken');
  }

  authDoubleCheck(): boolean {
    const usertoken = localStorage.getItem('usertoken');
    const apiguid = localStorage.getItem('apiguid');

    if(usertoken && apiguid) {
      return true;
    }

    return false;
  }
}
