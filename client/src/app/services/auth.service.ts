import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { CommonService } from './common.service';
// import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;

    constructor(
        private _router: Router,
        private _commonService: CommonService
    ) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    this._commonService.clearAll();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return this._commonService.getLocal('user.token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this._commonService.clearAll();
    this._router.navigate(['/sign-in']);
  }

  /*decode() {
    return decode(localStorage.getItem('token'));
  }*/
}