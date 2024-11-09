import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  GetCategoriesResponse,
  GetProductsResponse,
  ProductPriceRangeLatestResponse,
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/home`;

  public getCategories(): Observable<GetCategoriesResponse> {
    return this._http.get<GetCategoriesResponse>(`${this._url}/get-categories`);
  }

  public getProducts(): Observable<GetProductsResponse> {
    return this._http.get<GetProductsResponse>(`${this._url}/get-products`);
  }

  public priceRangeProduct(): Observable<ProductPriceRangeLatestResponse> {
    return this._http.get<ProductPriceRangeLatestResponse>(
      `${this._url}/product-price-range-latest`
    );
  }
}
