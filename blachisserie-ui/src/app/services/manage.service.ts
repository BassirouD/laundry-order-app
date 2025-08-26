import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {OrderRequest} from "../models/order-request";
import {OrderUserResponse} from "../models/order-user-response";
import {OrderAdminResponse} from "../models/order-admin-response";
import {OrderStatus} from "../models/order-status.enum";


@Injectable({
    providedIn: 'root'
})
export class ManageService {
    private endpoint = 'api/orders'

    constructor(
        private api: ApiService
    ) {
    }

    updateOrderStatus(id: number, status: OrderStatus) {
        return this.api.put(`${this.endpoint}/${id}/status`, {status});
    }


    getOrdersOwn() {
        return this.api.get(this.endpoint) as Observable<OrderUserResponse[]>;
    }

    getAllOrders() {
        return this.api.get(this.endpoint + '/all') as Observable<OrderAdminResponse[]>;
    }

    createOrder(orderRequest: OrderRequest): Observable<OrderRequest> {
        return this.api.post(this.endpoint, orderRequest) as Observable<OrderRequest>;
    }
}
