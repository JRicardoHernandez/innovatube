import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInformationViewComponent } from './card-information-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardInformationViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardInformationViewComponent
  ]
})
export class CardInformationViewModule { }
