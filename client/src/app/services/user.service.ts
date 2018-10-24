import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url: string;
    private headers: Headers;
    private headersToken: Headers;

    constructor(private _http: Http, private _commonService: CommonService ) {
        this.url = environment.api_url + '/users';

        this.headers = new Headers({
            'Content-Type': 'application/json'
        });

        this.headersToken = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this._commonService.getLocal('user.token')
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

    update(user) {
        const params = JSON.stringify(user);

        return this._http.put(`${this.url}/`, params, {headers: this.headersToken});
    }
}
