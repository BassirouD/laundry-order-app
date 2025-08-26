import {OrderStatus} from "../models/order-status.enum";

export const ORDER_STATUS_CLASSES: Record<string, string> = {
    Pending: 'status-pending',
    Approved: 'status-accepted',
    Rejected: 'status-refused',
};


