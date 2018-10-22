import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    public url: string;

    constructor(private _http: Http) {
        this.url = environment.api_url + '/users';
    }
    
    signIn(user, hash = false) {

        if(hash) {
            user.gethash = true;
        }

        const json = JSON.stringify(user);
        const params = json;

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(`${this.url}/login`, params, {headers: headers});
    }

    signUp() {
        return 'Sign Up';
    }
}
