import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://34.229.6.164/peliculas';

  constructor(private http: HttpClient) { }

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  obtenerPelicula(id: string): Observable<Pelicula> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pelicula>(url);
  }

  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: string, pelicula: Pelicula): Observable<Pelicula> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Pelicula>(url, pelicula);
  }

  eliminarPelicula(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
