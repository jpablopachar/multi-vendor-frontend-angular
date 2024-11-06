import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  GetCardProductsResponse,
  GetWhishlistProductsResponse
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/home/product`;

  public getCardProducts(userId: string): Observable<GetCardProductsResponse> {
    return this._http.get<GetCardProductsResponse>(
      `${this._url}/get-card-products/${userId}`
    );
  }

  public getWhishlistProducts(
    userId: string
  ): Observable<GetWhishlistProductsResponse> {
    return this._http.get<GetWhishlistProductsResponse>(
      `${this._url}/get-wishlist-products/${userId}`
    );
  }
}
