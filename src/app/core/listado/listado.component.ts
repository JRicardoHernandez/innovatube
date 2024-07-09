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
      let _url_encode = encodeURIComponent(this._search_formGroup.value._query);
      this._YoutubeService._getListYoutube(_url_encode)
      .subscribe({
        next: x => {
          this._listado = x.items;
          console.log(x);
          this._loading_search = false; 
        },
        error: err => {
          console.log(err);
          this._loading_search = false;
        },
        complete: () => {
          console.log("Completo");
          console.log(this._listado);
          this._loading_search = false;
        }
      });
    }
  }

}
