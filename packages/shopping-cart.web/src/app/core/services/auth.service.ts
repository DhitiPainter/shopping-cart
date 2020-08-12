import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/models';
import { CommonService } from './common.service';
import { Roles } from '../common.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInfoToken = 'sign-data-auth';
  jwtToken = 'auth-token';
  refreshTokens = 'refresh-token';
  authUserInfo = 'user-data';
  userInfo = 'user-data-auth';
  rememberUser = 'remember-user';
  userRole = 'user-role';

  constructor(private commonService: CommonService) { }

  getAuthToken() {
    return localStorage.getItem(this.jwtToken) || null;
  }

  setAuhToken(token: string) {
    localStorage.setItem(this.jwtToken, token);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokens, refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokens) || null;
  }

  destroyToken() {
    window.localStorage.removeItem(this.jwtToken);
  }

  getRememberUser() {
    return localStorage.getItem(this.rememberUser) || null;
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */
    return new Observable<string>();
    // return this.httpService
    //   .post(ApiConstants.refreshToken, { RefreshToken: this.getRefreshToken() }).pipe(
    //     catchError(error => throwError(error)),
    //     map((response: any) => {
    //       return response;
    //     }));
  }

  setUserInfoAuth(userInfo: UserModel) {
    localStorage.setItem(
      this.userInfo,
      userInfo ? btoa(JSON.stringify(userInfo)) : ''
    );
  }

  getUserInfoAuth(): UserModel {
    return this.userInfo
      ? ((localStorage.getItem(this.userInfo) !== null && localStorage.getItem(this.userInfo) !== undefined &&
        localStorage.getItem(this.userInfo) !== '') ? (JSON.parse(atob(localStorage.getItem(this.userInfo)))) : null)
      : null;
  }

  setSessionRole(roleId) {
    const sessionRole = this.commonService.userRoles.find(x => x.id.toString() === roleId);
    switch (sessionRole.name) {
      case Roles.admin:
        sessionStorage.setItem(this.userRole, Roles.admin);
        break;
      case Roles.superAdmin:
        sessionStorage.setItem(this.userRole, Roles.superAdmin);
        break;
      case Roles.user:
        sessionStorage.setItem(this.userRole, Roles.user);
        break;
      default:
        break;
    }
  }

  getSessionRole() {
    return sessionStorage.getItem(this.userRole);
  }

  logout() {
    // localStorage.removeItem(this.jwtToken);
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.removeItem(this.userInfo);
    // localStorage.removeItem(this.refreshTokens);
    // localStorage.removeItem(this.signInfoToken);
  }
}
