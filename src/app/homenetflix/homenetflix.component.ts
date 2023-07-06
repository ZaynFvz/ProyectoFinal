import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-homenetflix',
  templateUrl: './homenetflix.component.html',
  styleUrls: ['./homenetflix.component.css']
})
export class HomenetflixComponent {
  constructor(private router: Router) {}
  peliculas:any = [];
  peliculasAccion:any = [];
  peliculasDrama:any = [];
  peliculasComedia:any = [];
  peliculasRomance:any = [];
  peliculasTerror:any = [];
  imageUrls: string[] = [
    './assets/fondonetflix.jpg',
    'https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg',
    './assets/fondonetflix.jpg'
  ];
  ngOnInit(): void {
    this.getPeliculas()
  }
  
  getPeliculas() {
    const category = 'Accion';
    const category2 = 'Drama';
    const category3 = 'Terror';
    const category4 = 'Comedia';
    const category5 = 'Romance';
    const url = 'http://api_container/peliculas';
  
    axios.get(url)
      .then(response => {
        const data = response.data;
  
        if (!Array.isArray(data)) {
          throw new Error('La respuesta no es un array');
        }
  
        const filteredMovies = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category;
        });
        const filteredMovies2 = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category2;
        });
        const filteredMovies3 = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category3;
        });
        const filteredMovies4 = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category4;
        });
        const filteredMovies5 = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category5;
        });
  
        this.peliculasAccion = filteredMovies;
        this.peliculasDrama = filteredMovies2;
        this.peliculasTerror = filteredMovies3;
        this.peliculasComedia = filteredMovies4;
        this.peliculasRomance = filteredMovies5;
      })
      .catch(error => {
        console.error('Error al obtener las películas:', error);
      });
  }
  @ViewChild('imageList') imageListRef!: ElementRef;
  @ViewChild('imageList2') imageListRef2!: ElementRef;
 
  prevImage() {
    const imageList = this.imageListRef.nativeElement;
    const scrollAmount = imageList.offsetWidth;
    imageList.scrollLeft -= scrollAmount;
  }

  nextImage() {
    const imageList = this.imageListRef.nativeElement;
    const scrollAmount = imageList.offsetWidth;
    imageList.scrollLeft += scrollAmount;
  }

  prevImage1() {
    const imageList = this.imageListRef2.nativeElement;
    const scrollAmount = imageList.offsetWidth;
    imageList.scrollLeft -= scrollAmount;
  }

  nextImage1() {
    const imageList = this.imageListRef2.nativeElement;
    const scrollAmount = imageList.offsetWidth;
    imageList.scrollLeft += scrollAmount;
  }

  verDetalleSerie(id: string) {
    this.router.navigate(['navigator/serie-pelis', id]);
  }

}