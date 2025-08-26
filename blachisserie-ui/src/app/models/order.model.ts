export interface Order {
    id?: number;
    date: Date | null;
    items: string[];
    customerName: string;
    customerSurname: string;
    reason?: string;
    comment?: string;
    status?: 'EN_ATTENTE' | 'VALIDE' | 'REFUSE';
}
