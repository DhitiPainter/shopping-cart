import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
    showSideBar = false;

    toggleSideBar() {
        this.showSideBar = !this.showSideBar;
    }
}
