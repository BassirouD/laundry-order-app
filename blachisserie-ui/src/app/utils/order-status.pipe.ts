import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Pending':
        return 'En attente';
      case 'Approved':
        return 'Validée';
      case 'Rejected':
        return 'Refusée';
      default:
        return status;
    }
  }
}
