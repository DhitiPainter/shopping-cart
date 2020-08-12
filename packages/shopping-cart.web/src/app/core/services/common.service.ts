import { Injectable } from '@angular/core';
import { throwError, interval } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';

import { HttpClientService } from 'src/app/core/interceptors/http-client.service';
import { BroadcastService } from './broadcast.service';
import { BroadcastKeys } from '../common.constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userRoles = [];

  constructor(private httpService: HttpClientService, private broadcastService: BroadcastService) {
  }


  getRoles() {
    return this.httpService.get('auth/roles')
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((response: any) => {
          return response;
        })
      )
  }

  getUserRoles() {
    interval(30 * 1000)
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        flatMap(() => this.getRoles())
      )
      .subscribe((response: any) => {
        this.onRoleSuscription(response);
      })
    // }
  }

  private onRoleSuscription(response) {
    this.userRoles = response;
    this.broadcastService.broadcast(BroadcastKeys.userRoles, response)
  }
}