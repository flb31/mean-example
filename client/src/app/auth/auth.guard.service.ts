import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _auth: AuthService, private _router: Router) {}

    canActivate(): boolean {
         
        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['sign-in']);
            return false;
        }
        return true;
    }
}
