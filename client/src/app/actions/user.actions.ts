import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import User from '../models/user';

export const USER_UPDATE = '[User] Update';

export class UpdateUser implements Action {
    readonly type = USER_UPDATE;
    
    constructor(public payload: User) {};
}

export type Actions = UpdateUser;
