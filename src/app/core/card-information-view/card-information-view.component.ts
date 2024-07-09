import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFavorite } from 'src/app/interfaces/user-data.interfaces';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';
import Swal from 'sweetalert2'

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
        this._favorito_data = x;
        this._favorito = true;
      },
      error: err => {},
      complete: () => {}
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
        Swal.fire({
          icon: "success",
          title: "Favoritos",
          text: "Se agrego a tus favoritos"
        });
        this._favorito = true;
        this._favorito_data._id = x._id;
      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.error,
        });
      },
      complete: () => {}
    });
  }
  
  deleteFavorite(id: string) {
    if (this._favorito_data._id=='') {return}
    this._YoutubeService._deleteFavorite(this._favorito_data)
    .subscribe({
      next: x => {
        Swal.fire({
          icon: "success",
          title: "Favoritos",
          text: "Se ELIMINÓ de tus favoritos"
        });
        this._favorito = false;
        this._favorito_data = {} as IFavorite;
      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.error,
        });
      },
      complete: () => {}
    });
  }

}
