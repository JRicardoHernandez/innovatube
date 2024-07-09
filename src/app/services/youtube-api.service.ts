import { Injectable } from '@angular/core';
import { $API_BASE } from '../constants/general';
import { HttpClient } from '@angular/common/http';
import { IFavorite } from '../interfaces/user-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private _base_api = `${$API_BASE._api_youtube}/youtube/${$API_BASE._api_youtube_version}/search?key=AIzaSyAWc2TEklkP7Mbn2sWWxZ0NSyOG-tgE3LU`;
  private _base_api_firestore = `${$API_BASE._api_base}/${$API_BASE._api_version}`;

  constructor(
    private http: HttpClient
  ) { }

  _getListYoutube(params: string = "&part=snippet&order=viewCount&q=skateboarding+dog&type=video&videoDefinition=high") {
    return this.http.get<any>(`${this._base_api}${params}`);
  }

  _createFavorite(body: IFavorite) {
    let headers: any = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.post<IFavorite[]>(`${this._base_api_firestore}/createFavorite`, body,{ headers: headers});
  }

  _getFavorite(body: {_id: string}) {
    let headers: any = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.post<IFavorite[]>(`${this._base_api_firestore}/getFavorite`, body,{ headers: headers});
  }

  _deleteFavorite(body: IFavorite) {
    let headers: any = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.http.post<IFavorite[]>(`${this._base_api_firestore}/deleteFavorite`, body,{ headers: headers});
  }

}
