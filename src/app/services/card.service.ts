import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AddProductToCardRequest,
  AddProductToCardResponse,
  AddProductToWishlistRequest,
  GetCardProductsResponse,
  GetWhishlistProductsResponse,
  ResponseSuccess,
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/home/product`;

  public addToCard(
    body: AddProductToCardRequest
  ): Observable<AddProductToCardResponse> {
    return this._http.post<AddProductToCardResponse>(
      `${this._url}/add-to-card`,
      body
    );
  }

  public getCardProducts(userId: string): Observable<GetCardProductsResponse> {
    return this._http.get<GetCardProductsResponse>(
      `${this._url}/get-card-products/${userId}`
    );
  }

  public deleteCardProduct(cardId: string): Observable<ResponseSuccess> {
    return this._http.delete<ResponseSuccess>(
      `${this._url}/delete-card-product/${cardId}`
    );
  }

  public quantityInc(cardId: string): Observable<ResponseSuccess> {
    return this._http.put<ResponseSuccess>(
      `${this._url}/quantity-inc/${cardId}`,
      null
    );
  }

  public quantityDec(cardId: string): Observable<ResponseSuccess> {
    return this._http.put<ResponseSuccess>(
      `${this._url}/quantity-dec/${cardId}`,
      null
    );
  }

  public addToWishlist(
    body: AddProductToWishlistRequest
  ): Observable<ResponseSuccess> {
    return this._http.post<ResponseSuccess>(
      `${this._url}/add-to-wishlist`,
      body
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
