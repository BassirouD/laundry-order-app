import {Component} from '@angular/core';
import {Order} from "../../models/order.model";
import {ManageService} from "../../services/manage.service";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {CommandFormComponent} from "../command-form/command-form.component";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {TokenService} from "../../services/token/token.service";
import {AuthService} from "../../services/auth.service";
import {OrderRequest} from "../../models/order-request";
import {OrderUserResponse} from "../../models/order-user-response";
import {OrderStatusPipe} from "../../utils/order-status.pipe";
import {ORDER_STATUS_CLASSES} from "../../utils/order-status.constants";
import {NotificationsService} from "../../services/notifications-service.service";
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-client-dashboard',
    standalone: true,
    imports: [
        DialogModule,
        CommandFormComponent,
        DatePipe,
        TableModule,
        CardModule,
        NgClass,
        ButtonModule,
        CommonModule,
        OrderStatusPipe,
        ToastModule
    ],
    providers: [MessageService, OrderStatusPipe],
    templateUrl: './client-dashboard.component.html',
    styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {
    orders: OrderUserResponse[] = [];
    displayForm = false;
    displayDetails = false;
    selectedOrder!: OrderUserResponse;

    constructor(
        private manageService: ManageService,
        private tokenSrv: TokenService,
        private notifSvc: NotificationsService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.loadOrders();

        this.notifSvc.start(this.tokenSrv.token);
        this.notifSvc.messages$.subscribe(notif => {
            if (notif.type === "OrderUpdated") {
                this.messageService.add({
                    severity: notif.status === 'Approved' ? 'success' : 'info',
                    summary: 'Mise à jour commande',
                    detail: notif.message
                });

                this.loadOrders();
            }
        });
    }

    saveOrder() {
        this.loadOrders()
        this.displayForm = false;
    }

    openForm() {
        this.displayForm = true;
    }

    openDetails(order: OrderUserResponse) {
        this.selectedOrder = {...order};
        this.displayDetails = true;
    }

    loadOrders() {
        this.manageService.getOrdersOwn().subscribe({
            next: (orders) => {
                this.orders = orders
            },
            error: (err) => console.error(err)
        });
    }

    getStatusClass(status: string): string {
        return ORDER_STATUS_CLASSES[status] || '';
    }

    logout() {
        this.notifSvc.stop();
        this.tokenSrv.logout();
    }
}
