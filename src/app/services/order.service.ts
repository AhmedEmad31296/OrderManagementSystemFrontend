import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { PlaceOrderInput, OrderDto } from '../models/orderDto/OrderDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.apiUrl + 'Order';

  constructor(private http: HttpClient) {}

  placeOrder(input: PlaceOrderInput): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/PlaceOrder`,
      input
    );
  }

  listOrders(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(`${this.baseUrl}/ListOrders`);
  }

  cancelOrder(orderId: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/CancelOrder/${orderId}`,
      {}
    );
  }
}
