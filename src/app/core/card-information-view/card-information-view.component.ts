import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-information-view',
  templateUrl: './card-information-view.component.html',
  styleUrls: ['./card-information-view.component.scss']
})
export class CardInformationViewComponent {
  @Input() _dataPost = {};
  defaultImg: string = '../../../assets/images/no-image-icon.png';
  _blank_field: string = '---';
  // INPUT DATA
  @Input() _currentIndex: number = 0;
  @Input() _totalStars: number = 0;
  @Input() _shared_card: boolean = false;
  @Input() _show_totalStars: boolean = false;
  @Input() _search_card: boolean = false;
  @Input() _show_id: boolean = false;
  // OUTPUT DATA
  @Output() _function_activePost = new EventEmitter<{id: string|undefined, position: number}>();
  @Output() _function_deletePost = new EventEmitter<{id: string|undefined, position: number, deletePost: boolean}>();

  constructor(
  ) {
  }

  activePost(id: string | undefined, position: number) {
    this._function_activePost.emit({ id: id, position: position });
  }
  
  deletePost(id: string | undefined, position: number, deletePost: boolean = false) {
    this._function_deletePost.emit({ id: id, position: position, deletePost: deletePost});
  }

}
