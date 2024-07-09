import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado.component';
import { CardInformationViewModule } from '../card-information-view/card-information-view.module';
import { ListRoutingModule } from './listado-routing.module';

@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    CardInformationViewModule,
    ListRoutingModule
  ]
})
export class ListadoModule { }
