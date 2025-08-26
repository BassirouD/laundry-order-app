import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {ApiService} from "./api.service";
import {RegistrationRequest} from "../models/registration-request";
import {Observable} from "rxjs";
import {AuthenticationRequest} from "../models/authentication-request";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private endpoint = 'api/auth/'

    constructor(
        private api: ApiService
    ) {
    }

    register(user: RegistrationRequest): Observable<any> {
        return this.api.post(this.endpoint + 'register', user);
    }

    login(user: AuthenticationRequest): Observable<any> {
        return this.api.post(this.endpoint + 'login', user);
    }

    me(): Observable<any> {
        return this.api.get(this.endpoint + 'me');
    }
}
