import User from '../models/user';
import * as UserActions from './../actions/user.actions';
import { CommonService } from '../services/common.service';

const initialState: User = JSON.parse(localStorage.getItem('user.identity')); 

export function reducer(state: User = initialState, action: UserActions.Actions) {

    switch(action.type) {
        case UserActions.USER_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
