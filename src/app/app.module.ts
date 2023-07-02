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
import { NavbarComponent } from './navbar/navbar.component'
@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuariosComponent,
    LoginUsuariosComponent,
    CatalogoComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
