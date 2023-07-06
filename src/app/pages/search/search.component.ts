import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  peliculas: any[] = [];
  resultados: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(): void {
    this.http.get<any[]>('http://52.86.133.104/peliculas').subscribe(
      peliculas => {
        this.peliculas = peliculas;
      },
      error => {
        console.error(error);
      }
    );
  }

  buscarPeliculas(): void {
    if (this.query.trim().length > 0) {
      this.resultados = this.peliculas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(this.query.toLowerCase()) ||
        pelicula.categoria.nombre.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.resultados = [];
    }
  }
  

  verDetalleSerie(id: string) {
    this.router.navigate(['navigator/serie-pelis', id]);
  }
}
