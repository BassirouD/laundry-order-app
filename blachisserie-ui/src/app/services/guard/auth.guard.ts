import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../auth.service";
import {TokenService} from "../token/token.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.isTokenNotValid()) {
        router.navigate(['/login']);
        return false;
    }

    // if (!authService.isLoggedIn()) {
    //     router.navigate(['/login']);
    //     return false;
    // }
    //
    // const expectedRole = route.data?.['role'] as 'ADMIN' | 'CLIENT' | undefined;
    // const userRole = authService.getRole();
    //
    // if (expectedRole && userRole !== expectedRole) {
    //     router.navigate(['/login']);
    //     return false;
    // }

    return true;
};
