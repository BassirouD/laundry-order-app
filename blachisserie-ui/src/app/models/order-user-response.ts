export interface OrderUserResponse {
    id: number;
    items: string;
    reason?: string;
    comment?: string;
    status: string;
    date: string;
    userId: number
}
