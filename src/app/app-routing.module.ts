import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoModule } from './core/listado/listado.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ListadoModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
