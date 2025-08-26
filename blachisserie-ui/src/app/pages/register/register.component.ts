import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {RegistrationRequest} from "../../models/registration-request";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ToastModule,
        CardModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    providers: [MessageService],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerRequest: RegistrationRequest = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    confirmPassword = '';
    selectedRole: 'ADMIN' | 'CLIENT' | null = null;

    roles = [
        {label: 'Client', value: 'CLIENT'},
        {label: 'Administrateur', value: 'ADMIN'}
    ];

    constructor(
        private router: Router,
        private messageService: MessageService,
        private authService: AuthService
    ) {
    }

    register() {
        if (this.registerRequest.password !== this.confirmPassword) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Mot de passe',
                detail: 'Les mots de passe ne correspondent pas.'
            });
            return;
        }

        this.authService.register(this.registerRequest).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Enregistrement',
                    detail: 'Enregistrement réussi !'
                });
                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 1000);
            },
            error: (err) => {
                if (err.error && err.error.errors) {
                    const validationErrors = err.error.errors;
                    for (const field in validationErrors) {
                        if (validationErrors.hasOwnProperty(field)) {
                            const messages: string[] = validationErrors[field];
                            messages.forEach(msg => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: `Erreur sur ${field}`,
                                    detail: msg
                                });
                            });
                        }
                    }
                }
                else if (err.error) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: err.error
                    });
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur s’est produite.'
                    });
                }
            }
        });
    }

    goToLogin() {
        this.router.navigateByUrl('/login');
    }
}
