import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderDto } from 'src/app/models/orderDto/OrderDto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: OrderDto[] = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.listOrders().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.orders = response.data;
        } else {
          this.toastr.error('Failed to fetch orders');
        }
      },
      error: (err) => {
        this.toastr.error('Error fetching orders', err.message);
      },
    });
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            this.toastr.success(response.message);
            this.fetchOrders();
          } else {
            this.toastr.error('Error canceling order');
          }
        },
        error: (err) => {
          this.toastr.error('Error canceling order', err.message);
        },
      });
    }
  }
}
