import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { AuthResponse, LoginRequest, RegisterRequest } from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/customer`;

  public customerRegister(body: RegisterRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(
      `${this._url}/customer-register`,
      body
    );
  }

  public customerLogin(body: LoginRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._url}/customer-login`, body);
  }
}
