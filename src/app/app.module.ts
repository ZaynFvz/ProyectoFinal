import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { LoginUsuariosComponent } from './login-usuarios/login-usuarios.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { VideoComponent } from './pages/video/video.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin.guard';
import { FooterComponent } from './footer/footer.component';
import { HomenetflixComponent } from './homenetflix/homenetflix.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SeriePelisComponent } from './serie-pelis/serie-pelis.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuariosComponent,
    LoginUsuariosComponent,
    CatalogoComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    NavbarComponent,
    VideoComponent,
    PeliculasComponent,
    FooterComponent,
    HomenetflixComponent,
    NavigatorComponent,
    SeriePelisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
