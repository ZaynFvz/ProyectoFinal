import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { LoginUsuariosComponent } from './login-usuarios/login-usuarios.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'registro', component: RegistroUsuariosComponent },
  { path: 'login', component: LoginUsuariosComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'home/:id', component: MovieDetailsComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
