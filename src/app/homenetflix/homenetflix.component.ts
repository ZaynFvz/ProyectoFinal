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
  imageUrls: string[] = [
    './assets/fondonetflix.jpg',
    'https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg',
    './assets/fondonetflix.jpg'
  ];
  ngOnInit(): void {
    this.getPeliculas()
  }
  series: {id:number, imagenurl: string, titulo: string, descripcion: string, urlvideo:String }[] = [
    { id:1, imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 1", descripcion: "Descripción de la Serie 1", urlvideo:"./assets/serie1/mp4"},
    { id:2,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 2", descripcion: "Descripción de la Serie 2", urlvideo:"./assets/serie1/mp4"},
    { id:3,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 3", descripcion: "Descripción de la Serie 3", urlvideo:"./assets/serie1/mp4" },
    { id:4,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 4", descripcion: "Descripción de la Serie 4", urlvideo:"./assets/serie1/mp4" },
    { id:5,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 5", descripcion: "Descripción de la Serie 5", urlvideo:"./assets/serie1/mp4" },
    { id:6,imagenurl: "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg", titulo: "Serie 6", descripcion: "Descripción de la Serie 6", urlvideo:"./assets/serie1/mp4" },
    { id:7,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 7", descripcion: "Descripción de la Serie 7", urlvideo:"./assets/serie1/mp4" },
    { id:8,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 8", descripcion: "Descripción de la Serie 8", urlvideo:"./assets/serie1/mp4" },
    { id:9,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 9", descripcion: "Descripción de la Serie 9", urlvideo:"./assets/serie1/mp4" },
    { id:10,imagenurl: "./assets/fondonetflix.jpg", titulo: "Serie 10", descripcion: "Descripción de la Serie 10", urlvideo:"./assets/serie1/mp4" },
    // Agrega más elementos según tus necesidades
  ];
  getPeliculas() {
    const category = 'Accion';
    const url = 'http://52.86.133.104/peliculas';
  
    axios.get(url)
      .then(response => {
        const data = response.data;
  
        if (!Array.isArray(data)) {
          throw new Error('La respuesta no es un array');
        }
  
        const filteredMovies = data.filter(movie => {
          return movie && movie.categoria && movie.categoria.nombre === category;
        });
  
        this.peliculasAccion = filteredMovies;
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