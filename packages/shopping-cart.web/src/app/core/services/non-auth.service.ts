import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClientService } from 'src/app/core/interceptors/http-client.service';
import { UserLogin } from 'src/app/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthService {

  constructor(private httpService: HttpClientService, private authService: AuthService) { }

  loginUser(userModel: UserLogin) {
    return this.httpService.post(`auth/authenticate`, userModel)
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((response: any) => {
          this.authService.setSessionRole(response.user.role);
          return response;
        }));
  }

  registerUser(user: UserLogin) {
    return this.httpService.post(`auth/register`, user)
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((response: any) => {
          return response;
        })
      )
  }

  ForgotPassword(email: string) {
    return this.httpService.get(`api/User/ForgotPassword?email=${email}`);
  }

  ValidateInviteUser(userId: string) {
    return this.httpService.get(`api/User/ValidateInviteUser?userId=${userId}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        }
        ),
        map((response: any) => {
          return response;
        }));
  }
}
