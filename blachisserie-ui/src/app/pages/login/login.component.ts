import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext"
import {PasswordModule} from "primeng/password"
import {MessageService} from "primeng/api";
import {ButtonModule} from 'primeng/button';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthenticationRequest} from "../../models/authentication-request";
import {TokenService} from "../../services/token/token.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        ToastModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    authRequest: AuthenticationRequest = {
        email: '',
        password: ''
    }

    constructor(
        private messageService: MessageService,
        private router: Router,
        private autSrv: AuthService,
        private tokenService: TokenService
    ) {
    }

    login() {
        this.autSrv.login(this.authRequest).subscribe({
            next: (response) => {
                this.tokenService.token = response.token as string;
                this.messageService.add({severity: 'success', summary: 'Login', detail: 'Connexion réussie !'})
                setTimeout(() => {
                    if (response.user.role === 'USER') {
                        this.router.navigateByUrl('/client-dashboard');
                    }
                    if (response.user.role === 'ADMIN') {
                        this.router.navigateByUrl('/admin-dashboard');
                    }
                }, 1000)
            }, error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login',
                    detail: err.error
                });
            }
        })
    }

    goToRegister() {
        this.router.navigateByUrl('/register');
    }
}
