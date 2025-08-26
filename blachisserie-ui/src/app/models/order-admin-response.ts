export interface OrderAdminResponse{
    id: number;
    items: string;
    reason?: string;
    comment?: string;
    status: string;
    date: string;
    userNom: string;
    userPrenom: string;
    userId: number;
}
