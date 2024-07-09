import { Injectable } from '@angular/core';
import { $API_BASE } from '../constants/general';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse, ILogoutResponse, IRegisterResponse, IResetPasswordResponse } from '../interfaces/auth-response.interface';
import { catchError, map, throwError } from 'rxjs';
import { IAuthLogin, IAuthLogout, IAuthRegister, IAuthResetPassword, IUser } from '../interfaces/user-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _base_api = `${$API_BASE._api_base}/${$API_BASE._api_version}`;

  constructor(
    private http: HttpClient
  ) { }

  _login(body: IAuthLogin) {
    return this.http.post<ILoginResponse>(`${this._base_api}/login`, body);
  }

  _register(body: IAuthRegister) {
    return this.http.post<IRegisterResponse>(`${this._base_api}/register`, body);
  }

  _logout(body: IAuthLogout) {
    return this.http.post<ILogoutResponse>(`${this._base_api}/logout`, body);
  }

  _reset_password(body: IAuthResetPassword) {
    return this.http.post<IResetPasswordResponse>(`${this._base_api}/reset-password`, body);
  }

  _getCurrentUser(email: string) {
    let headers: any = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.post<IUser>(`${this._base_api}/getUserByEmail`, {email},{ headers: headers});
  }

  sendToken(token: string){
    return this.http.post<any>(`${this._base_api}/reCaptcha`,  {recaptcha: token});
  }

}
