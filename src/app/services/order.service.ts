import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  GetOrderDetailsResponse,
  GetOrdersResponse,
  PlaceOrderRequest,
  PlaceOrderResponse
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/home`;

  public placeOrder(body: PlaceOrderRequest): Observable<PlaceOrderResponse> {
    return this._http.post<PlaceOrderResponse>(
      `${this._url}/order/place-order`,
      body
    );
  }

  public getOrders(
    customerId: string,
    status: string
  ): Observable<GetOrdersResponse> {
    return this._http.get<GetOrdersResponse>(
      `${this._url}/customer/get-orders/${customerId}/${status}`
    );
  }

  public getOrderDetails(orderId: string): Observable<GetOrderDetailsResponse> {
    return this._http.get<GetOrderDetailsResponse>(
      `${this._url}/customer/get-order-details/${orderId}`
    );
  }
}
