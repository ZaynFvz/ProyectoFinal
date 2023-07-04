import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
})
export class PeliculasComponent implements OnInit {
  peliculas: any[] = [];
  nuevoElenco: string = '';
  elenco: string[] = [];
  categorias: any[] = [];
  @ViewChild('anopublicInput', { static: false })
  anopublicInput!: ElementRef<HTMLInputElement>;
  categoriaSeleccionada: string = '';
  pelicula: any = {
    nombre: '',
    descripcion: '',
    urlpelicula: '',
    urlimagen: '',
    categoria: '',
    duracion: '',
    director: '',
    elenco: [],
  };
  peliculasFiltradas: any[] = [];

  anopublic: number | null = null;

  constructor() {
    this.peliculas = []; // Inicializar el arreglo de películas vacío
  }

  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarCategorias();
    this.peliculasFiltradas = this.peliculas; // Cargar todas las películas sin filtrar inicialmente
  }
  

  filtrarPorCategoria(categoriaId: string) {
    if (categoriaId === '') {
      this.peliculasFiltradas = this.peliculas;
    } else {
      this.peliculasFiltradas = this.peliculas.filter(pelicula => pelicula.categoria._id === categoriaId);
    }
  }
  
  
  
  cargarPeliculas() {
    axios
      .get('http://52.86.133.104/peliculas')
      .then((response) => {
        this.peliculas = response.data;
        this.peliculasFiltradas = response.data;
      })
      .catch((error) => {
        console.error('Error al cargar las películas:', error);
      });
  }
  agregarElenco() {
    if (
      this.nuevoElenco.trim() !== '' &&
      !this.elenco.includes(this.nuevoElenco)
    ) {
      this.elenco.push(this.nuevoElenco);
      this.nuevoElenco = '';
      console.log('NUEVO ELEMENTO: ' + this.nuevoElenco);
      console.log('LISTA: ' + JSON.stringify(this.elenco));
    }
  }
  eliminarActor(event: Event, nombre: string) {
    event.stopPropagation();
    const indice = this.elenco.indexOf(nombre);
    if (indice !== -1) {
      this.elenco.splice(indice, 1);
    }
  }

  onNuevoElencoChange(event: any) {
    const nuevoValor = event.target.value || '';
    this.nuevoElenco = nuevoValor;
    console.log('Valor actualizado de nuevoElenco:', this.nuevoElenco);
  }

  cargarCategorias() {
    axios
      .get('http://52.86.133.104/categorias')
      .then((response) => {
        this.categorias = response.data;
      })
      .catch((error) => {
        console.error('Error al cargar las categorías:', error);
      });
  }
  guardarPelicula() {
    console.log('Datos de la película:', this.pelicula);
    this.pelicula.añopublic = this.anopublic;
    this.pelicula.categoria = this.categoriaSeleccionada;
    this.pelicula.elenco = [...this.elenco];
    if (this.pelicula._id) {
      const confirmacion = window.confirm('¿Estás seguro de editar esta película?');
      if (confirmacion) {
        axios
        .put(
          `http://52.86.133.104/peliculas/${this.pelicula._id}`,
          this.pelicula
        )
        .then((response) => {
          console.log('Película editada:', response.data);
          this.cargarPeliculas();
          this.resetFormulario();
        })
        .catch((error) => {
          console.error('Error al editar la película:', error);
        });
      }
      
    } else {
      // Creación de una nueva película
      const confirmacion = window.confirm('¿Estás seguro de guardar esta película?');
      if (confirmacion) {
        axios
        .post('http://52.86.133.104/peliculas', this.pelicula)
        .then((response) => {
          console.log('Película guardada:', response.data);
          this.cargarPeliculas();
          this.resetFormulario();
        })
        .catch((error) => {
          console.error('Error al guardar la película:', error);
        });
      }
    
      
    }
  }

  editarPelicula(pelicula: any) {
      this.pelicula = { ...pelicula };
      this.categoriaSeleccionada = pelicula.categoria._id;
      this.pelicula.categoria = this.categoriaSeleccionada;
      this.anopublic = pelicula.añopublic;
      this.elenco = [...this.pelicula.elenco];
  }
  eliminarPelicula(id: string) {
    const confirmacion = window.confirm('¿Estás seguro de eliminar esta película?');
    if (confirmacion) {
      axios
      .delete(`http://52.86.133.104/peliculas/${id}`)
      .then((response) => {
        console.log('Película eliminada:', response.data);
        this.cargarPeliculas();
      })
      .catch((error) => {
        console.error('Error al eliminar la película:', error);
      });
    }
    
  }
  resetFormulario() {
    this.pelicula = {
      nombre: '',
      descripcion: '',
      urlpelicula: '',
      urlimagen: '',
      categoria: '',
      duracion: '',
      director: '',
      elenco: [],
    };
    this.anopublic = null;
    this.pelicula.elenco = [];
  }
}
