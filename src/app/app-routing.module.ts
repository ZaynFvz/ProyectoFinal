import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { LoginUsuariosComponent } from './login-usuarios/login-usuarios.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AuthGuard } from './auth.guard';
import { VideoComponent } from './pages/video/video.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { AdminGuard } from './admin.guard';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomenetflixComponent } from './homenetflix/homenetflix.component';
import { SeriePelisComponent } from './serie-pelis/serie-pelis.component';

const routes: Routes = [
  { path: 'registro', component: RegistroUsuariosComponent },
  { path: 'login', component: LoginUsuariosComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'home/:id', component: MovieDetailsComponent, canActivate: [AuthGuard]},
  { path: 'home/:id/video', component: VideoComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: PeliculasComponent, canActivate: [AdminGuard]},
  { path: 'navigator', component: NavigatorComponent,
    children: [
      { path: '', component: HomenetflixComponent, canActivate: [AuthGuard] },
      { path: 'serie-pelis/:id', component: SeriePelisComponent, canActivate: [AuthGuard] },
      { path: 'serie-pelis/:id/video', component: VideoComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: PeliculasComponent, canActivate: [AdminGuard]},
    ], 
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
