import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { User, Credentials } from './user';
import { UriService } from '../uri.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  hooplaWebServiceUrl: string;
  constructor(private http: HttpClient, private uriService: UriService) {
    this.hooplaWebServiceUrl = this.uriService.buildHooplaWebServiceUri();
  }

  login(userCredential: Credentials): Observable<User> {

    return this.http.post(this.hooplaWebServiceUrl + 'login', userCredential) as Observable<User>;
  }

  logout(): Observable<User> {
    return this.http.get(this.hooplaWebServiceUrl + 'logout') as Observable<User>;
  }

  getUserDetail(uEmail: string): Observable<User> {
    return this.http.get(this.hooplaWebServiceUrl + 'userDetail', {params: {uEmail}}) as Observable<User>;
  }

  // registerUser(newUser: User): Observable<User> {
  //   return this.http.post(this.hooplaWebServiceUrl + 'register', newUser) as Observable<User>;
  // }
}
