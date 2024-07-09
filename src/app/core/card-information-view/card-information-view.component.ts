import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFavorite } from 'src/app/interfaces/user-data.interfaces';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-card-information-view',
  templateUrl: './card-information-view.component.html',
  styleUrls: ['./card-information-view.component.scss']
})
export class CardInformationViewComponent implements OnInit {
  @Input() _dataPost: any = {};
  defaultImg: string = '../../../assets/images/no-image-icon.png';
  _blank_field: string = '---';
  _favorito_data: IFavorite = {} as IFavorite;
  _favorito: boolean = false;

  constructor(
    private _YoutubeService: YoutubeApiService
  ) {
  }

  ngOnInit(): void {
    this._YoutubeService._getFavorite({_id: this._dataPost.id.videoId})
    .subscribe({
      next: x => {
        console.log(x, this._dataPost.id.videoId);
        this._favorito_data = x[0];
        this._favorito = true;
      },
      error: err => {
        // console.log(err);
      },
      complete: () => {
      }
    });
  }

  createFavorite(id: string) {
    this._favorito_data = {
      _id: '',
      user: localStorage.getItem('email')+"",
      _id_video: id
    }
    this._YoutubeService._createFavorite(this._favorito_data)
    .subscribe({
      next: x => {
        console.log(x);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
      }
    });
  }
  
  deleteFavorite(id: string) {
    console.log(id, this._favorito_data);
    
    if (this._favorito_data._id!='') {return}
    this._YoutubeService._deleteFavorite(this._favorito_data)
    .subscribe({
      next: x => {
        console.log(x);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
      }
    });
  }

}
