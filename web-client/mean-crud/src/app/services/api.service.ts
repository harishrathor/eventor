import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ApiService {
    constructor(protected _http: HttpClient) {}

    public getUsersList() {
        return this._http.get('/api/app/app/users');
    }
}