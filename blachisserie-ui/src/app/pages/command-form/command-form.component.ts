import {Component, EventEmitter, Output} from '@angular/core';
import {Order} from "../../models/order.model";
import {ManageService} from "../../services/manage.service";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {MessageService} from "primeng/api";
import {OrderRequest} from "../../models/order-request";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-command-form',
    standalone: true,
    imports: [
        FormsModule,
        ToastModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MultiSelectModule,
        CalendarModule,
        InputTextareaModule,
        NgIf
    ],
    providers: [MessageService],
    templateUrl: './command-form.component.html',
    styleUrl: './command-form.component.scss'
})
export class CommandFormComponent {
    @Output() orderSubmit = new EventEmitter<OrderRequest>();

    order = {
        items: [] as string[],
        date: null as Date | null,
        reason: '',
        comment: ''
    };

    userInfos = {
        firstName: '',
        lastName: ''
    }

    minDate = new Date();

    availableItems = [
        {label: 'Chemise', value: 'Chemise'},
        {label: 'Pantalon', value: 'Pantalon'},
        {label: 'Draps', value: 'Draps'},
        {label: 'Serviette', value: 'Serviette'}
    ];


    constructor(
        private manageService: ManageService,
        private messageService: MessageService,
        private authSrv: AuthService
    ) {
    }

    ngOnInit() {
        this.getMyInfos();
    }

    submitOrder() {
        const dto = {
            items: this.order.items.join(', '),
            date: this.order.date,
            reason: this.order.reason,
            comment: this.order.comment
        };

        this.manageService.createOrder(dto).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Commande enregistrée avec succès !'
                });
                setTimeout(() => {
                    this.orderSubmit.emit(dto);
                }, 1000)

                this.order = {items: [], date: null, reason: '', comment: ''};
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible d’enregistrer la commande'
                });
                console.error(err);
            }
        });
    }

    getMyInfos() {
        this.authSrv.me().subscribe({
            next: (user) => {
                this.userInfos.firstName = user.firstName;
                this.userInfos.lastName = user.lastName;
            }
        })
    }
}
