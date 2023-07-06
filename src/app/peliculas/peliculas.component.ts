import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
})




export class PeliculasComponent implements OnInit {
  peliculas: any[] = [];
  busqueda: string = '';
  nuevoElenco: string = '';
  elenco: string[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

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
  onFileSelected(event: any) {
    // Obtén el archivo seleccionado desde el evento
    const file = event.target.files[0];
    // ...
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
      .get('http://api_container/peliculas')
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
      .get('http://api_container/categorias')
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
      Swal.fire({
        title: 'Éxito',
        text: 'Registro editado satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'netflix-alert',
          title: 'swal2-title',
          actions: 'swal2-actions',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then((result) => {
        axios
        .put(
          `http://api_container/peliculas/${this.pelicula._id}`,
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
      });
      
    } else {
      // Creación de una nueva película
      Swal.fire({
        title: 'Éxito',
        text: 'Registro guardado satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'netflix-alert',
          title: 'swal2-title',
          actions: 'swal2-actions',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then((result) => {
        axios
        .post('http://api_container/peliculas', this.pelicula)
        .then((response) => {
          console.log('Película guardada:', response.data);
          this.cargarPeliculas();
          this.resetFormulario();
        })
        .catch((error) => {
          console.error('Error al guardar la película:', error);
        });
      });
    
      
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
    Swal.fire({
      title: 'Eliminar Película',
      text: '¿Estás seguro de que quieres eliminar esta película?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        popup: 'netflix-alert',
        title: 'swal2-title',
        actions: 'swal2-actions',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://api_container/peliculas/${id}`)
          .then((response) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Registro eliminado satisfactoriamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                popup: 'netflix-alert',
                title: 'swal2-title',
                actions: 'swal2-actions',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel'
              }
            }).then((result) => {
              console.log('Película eliminada:', response.data);
              this.cargarPeliculas();
            });
          })
          .catch((error) => {
            console.error('Error al eliminar la película:', error);
          });
      }
    });
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
  filtrarPorBusqueda(busqueda: string) {
    // Aplica la lógica para filtrar las películas según la búsqueda
    // Utiliza la variable `busqueda` para realizar la búsqueda en tus datos
    
    // Ejemplo:
    this.peliculasFiltradas = this.peliculas.filter(pelicula =>
      pelicula.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
  
  limpiarBusqueda() {
    this.busqueda = '';
    this.filtrarPorBusqueda('');
  }
}
