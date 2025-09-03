import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    parseJWT(jwt: string) {
        let jwtHelper = new JwtHelperService();
        let objJWT = jwtHelper.decodeToken(jwt);
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }

    get token() {
        return localStorage.getItem('token') as string;
    }

    isTokenNotValid() {
        return !this.isTokenValid();
    }

    private isTokenValid() {
        const token = this.token;
        if (!token) return false;
        const jwtHelp = new JwtHelperService();
        const isTokenExpired = jwtHelp.isTokenExpired(token);
        if (isTokenExpired) {
            localStorage.clear();
            return false;
        }
        return true;
    }

    logout() {
        localStorage.clear();
        window.location.reload();
    }


}
