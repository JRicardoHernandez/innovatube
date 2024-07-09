import { Component } from '@angular/core';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  _listado: any;
  _pageInfo ={
    totalResults: null,
    resultsPerPage: null
  }

  constructor(
    private _YoutubeService: YoutubeApiService
  ){
    
    this._YoutubeService._getListYoutube()
    .subscribe({
      next: x => {
        this._listado = x.items;
        console.log(x);
        
      },
      error: err => {
        console.log(err);
        
      },
      complete: () => {
        console.log("Completo");
        console.log(this._listado);
        
      }
    });
  }
  

}
