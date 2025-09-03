import {Component} from '@angular/core';
import {Order} from "../../models/order.model";
import {ManageService} from "../../services/manage.service";
import {MessageService} from "primeng/api";
import {CardModule} from "primeng/card";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";
import {OrderAdminResponse} from "../../models/order-admin-response";
import {OrderStatus} from "../../models/order-status.enum";
import {OrderStatusPipe} from "../../utils/order-status.pipe";
import {ORDER_STATUS_CLASSES} from "../../utils/order-status.constants";
import { NotificationsService } from '../../services/notifications-service.service';
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
        CardModule,
        NgClass,
        DialogModule,
        DatePipe,
        TableModule,
        CommonModule,
        ButtonModule,
        OrderStatusPipe,
        ToastModule
    ],
    providers: [MessageService, OrderStatusPipe],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
    orders: OrderAdminResponse[] = [];
    selectedOrder!: OrderAdminResponse;
    displayDialog = false;
    readonly OrderStatus = OrderStatus;

    constructor(
        private manageService: ManageService,
        private authSrv: AuthService,
        private router: Router,
        private tokenService: TokenService,
        private messageService: MessageService,
        private notifSvc: NotificationsService,
    ) {
    }

    ngOnInit() {
        this.loadAllOrders();
        this.notifSvc.start(this.tokenService.token);
        this.notifSvc.messages$.subscribe(notif => {
            this.messageService.add({
                severity: notif.type === 'OrderCreated' ? 'success' : 'info',
                summary: 'Notification',
                detail: notif.message
            });

            this.loadAllOrders();
        });
    }

    openDetails(order: OrderAdminResponse) {
        console.log(order)
        this.selectedOrder = {...order};
        this.displayDialog = true;
    }

    updateStatus(order: OrderAdminResponse, status: OrderStatus) {
        this.manageService.updateOrderStatus(order.id, status).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: `Statut mis à jour : ${OrderStatus[status]}`
                });
                this.loadAllOrders();
                this.displayDialog = false;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de changer le status'
                });
            }
        });
    }

    loadAllOrders() {
        this.manageService.getAllOrders().subscribe({
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
        this.tokenService.logout();
    }

}
