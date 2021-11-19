import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeUserInLocalStorage(user: User) {
    localStorage.setItem('user_data', JSON.stringify(user));

    this.storeUserTokenInLocalStorage(user.apiguid);
  }

  private storeUserTokenInLocalStorage(apiGuid: string) {
    localStorage.setItem('user_token', JSON.stringify(apiGuid));
  }

  fethcUserFromLocalStorage() {
    const userData = localStorage.getItem('user_data');

    if(userData) {
      const parsedData = JSON.parse(userData);
      const user = new User(
        parsedData.username,
        parsedData.password,
        parsedData.apiguid
      );

      return user;
    }

    return null as any;
  }


  getUserTokenFromStorage() {
    return localStorage.getItem('user_token');
  }

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_token');
  }
}
