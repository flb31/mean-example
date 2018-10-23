import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    private url: string;
    private headers: Headers;

    constructor(private _http: Http) {
        this.url = environment.api_url + '/users';

        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }
    
    signIn(user, hash = false) {

        if(hash) {
            user.gethash = true;
        }

        const params = JSON.stringify(user);

        return this._http.post(`${this.url}/login`, params, {headers: this.headers});
    }

    signUp(user) {
        const params = JSON.stringify(user);

        return this._http.post(`${this.url}`, params, {headers: this.headers});
    }
}
