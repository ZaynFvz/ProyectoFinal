export interface Pelicula {
  _id?: string;
  nombre: string;
  descripcion: string;
  urlpelicula: string;
  urlimagen: string;
  categoria: string; // Cambiar por el tipo adecuado según tu implementación de Categoría
  duracion: string;
  director?: string;
  elenco: string[];
  anopublic: number;
}
