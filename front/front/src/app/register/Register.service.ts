import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { User, Credentials } from '../login/user';

@Injectable({
    providedIn: 'root'
})


export class registerService {
    urlregister = "http://localhost:1111/user"
    constructor(private http: HttpClient) {
    }
    registerUser(newUser: User): Observable<any> { 
        return this.http.post<any>(this.urlregister, newUser);
    }
}