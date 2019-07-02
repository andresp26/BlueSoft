import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './Pages/categoria/categoria.component';
import { AutorComponent } from './Pages/autor/autor.component';
import { LibrosComponent } from './Pages/libros/libros.component';

const routes: Routes = [
  {path: 'Categoria' , component: CategoriaComponent},
  {path: 'Autor' , component: AutorComponent},
  {path: 'Libros' , component: LibrosComponent},
  {path: '**' , pathMatch: 'full' , redirectTo: 'Categoria'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
