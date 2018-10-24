import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    
    setLocal(type, user) {
        localStorage.setItem(type, JSON.stringify(user));
    }

    getLocal(type) {
        return JSON.parse(localStorage.getItem(type));
    }

    removeLocal(type) {
        localStorage.removeItem(type);
    }

    clearAll() {
        localStorage.clear();
    }
}
