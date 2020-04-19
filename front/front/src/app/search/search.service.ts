import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ViewCatalog } from '../shared/viewcatalog';

@Injectable({
    providedIn: 'root'
})

export class searchService {
    urlregister = "http://localhost:1111/user"
    urlsearch = "http://localhost:1111/search/"
    constructor(private http: HttpClient) {
    }

    search(searchkey): Observable<any[]> {
        console.log("Search is called");
        console.log(searchkey+"frontend")
        return this.http.get<any[]>(this.urlsearch+searchkey);
    }
}