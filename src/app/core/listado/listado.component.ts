import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  _listado: any[] = [];
//   [
//     {
//         "kind": "youtube#searchResult",
//         "etag": "i3VNaVD4GHNZdC_K9gGyaOVXr_o",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "Bz8HV2SNMpA"
//         },
//         "snippet": {
//             "publishedAt": "2021-11-24T07:42:41Z",
//             "channelId": "UCUjrDJokSX8JavRwy5iUOkA",
//             "title": "Los Amos del Universo.- Carne Asada con Fedelobo, Facundo Herrera y Cilau valadez",
//             "description": "Anecdotas, chistes y buena comida. un programa donde veras una faceta diferente y divertida de todos. Síganos en nuestro ...",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/Bz8HV2SNMpA/default.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/Bz8HV2SNMpA/mqdefault.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/Bz8HV2SNMpA/hqdefault.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Franco Escamilla",
//             "liveBroadcastContent": "none",
//             "publishTime": "2021-11-24T07:42:41Z"
//         }
//     },
//     {
//         "kind": "youtube#searchResult",
//         "etag": "9Hfjwx794zQYpovEwrZEOA8xh4M",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "6iaApQVmqfQ"
//         },
//         "snippet": {
//             "publishedAt": "2023-08-02T04:00:03Z",
//             "channelId": "UCPmZ4uh0JGvRnEFT0dE5keA",
//             "title": "Yo No PUEDO Hacerte ESO 😂 #shorts #short #shortvideo #viral",
//             "description": "",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/6iaApQVmqfQ/default.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/6iaApQVmqfQ/mqdefault.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/6iaApQVmqfQ/hqdefault.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Christian Meza Oficial",
//             "liveBroadcastContent": "none",
//             "publishTime": "2023-08-02T04:00:03Z"
//         }
//     },
//     {
//         "kind": "youtube#searchResult",
//         "etag": "D8j96d2fc6LawhbeYycA27FMNe0",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "ONIZC18zdQc"
//         },
//         "snippet": {
//             "publishedAt": "2023-08-07T02:19:11Z",
//             "channelId": "UC5yf6da_FAU_mT9bAkn_BHg",
//             "title": "Anecdotario 207 - Entré a la iglesia por las morras Ft. @francoescamilla",
//             "description": "Únete a este canal para acceder a sus beneficios: https://www.youtube.com/channel/UC5yf6da_FAU_mT9bAkn_BHg/join ...",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/ONIZC18zdQc/default.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/ONIZC18zdQc/mqdefault.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/ONIZC18zdQc/hqdefault.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Ricardo Pérez",
//             "liveBroadcastContent": "none",
//             "publishTime": "2023-08-07T02:19:11Z"
//         }
//     },
//     {
//         "kind": "youtube#searchResult",
//         "etag": "LZDQwmx5YY-sLBoKju8XkHLhGC8",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "8LBtNn05-BY"
//         },
//         "snippet": {
//             "publishedAt": "2023-12-28T07:18:43Z",
//             "channelId": "UCfzJqyhcHX340hrLgPV38fg",
//             "title": "La mesa Reñoña &quot;Vacaciones para empleados&quot; Franco Escamilla",
//             "description": "",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/8LBtNn05-BY/default.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/8LBtNn05-BY/mqdefault.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/8LBtNn05-BY/hqdefault.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Juan Luis Ramirez",
//             "liveBroadcastContent": "none",
//             "publishTime": "2023-12-28T07:18:43Z"
//         }
//     },
//     {
//         "kind": "youtube#searchResult",
//         "etag": "N9diyUBCRH-AiVUo8I24sSRRDJY",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "qE3sB97QGO0"
//         },
//         "snippet": {
//             "publishedAt": "2019-06-18T06:54:05Z",
//             "channelId": "UCUjrDJokSX8JavRwy5iUOkA",
//             "title": "La Mesa Reñoña 151",
//             "description": "La Mesa Reñoña Recuerda descargar la aplicación oficial de Franco Escamilla Para iOS https://goo.gl/jXQoeE Para Google Play ...",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/qE3sB97QGO0/default.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/qE3sB97QGO0/mqdefault.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/qE3sB97QGO0/hqdefault.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Franco Escamilla",
//             "liveBroadcastContent": "none",
//             "publishTime": "2019-06-18T06:54:05Z"
//         }
//     }
// ];
  _pageInfo ={
    totalResults: null,
    resultsPerPage: null
  }
  _search_formGroup!: FormGroup;
  _loading_search: boolean = false;
  _search_text: string = '';

  constructor(
    private _YoutubeService: YoutubeApiService
  ){
    this._search_formGroup = new FormGroup({
      _query: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
    });
    
  }
  
  _search() {
    this._search_text = '';
    if (this._search_formGroup.invalid) {
      this._search_formGroup.markAllAsTouched();
      return
    }
    if (this._search_formGroup.valid) {
      this._loading_search = true;
      let _url_encode = encodeURI(this._search_formGroup.value._query);
      this._YoutubeService._getListYoutube(_url_encode)
      .subscribe({
        next: x => {
          this._listado = x.items;
          this._loading_search = false; 
        },
        error: err => {
          this._loading_search = false;
        },
        complete: () => {
          this._loading_search = false;
        }
      });
    }
  }

}
