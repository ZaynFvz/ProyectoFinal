import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-serie-pelis',
  templateUrl: './serie-pelis.component.html',
  styleUrls: ['./serie-pelis.component.css']
})
export class SeriePelisComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  pelicula: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = String(params['id']);
      console.log(id);
      axios.get(`http://52.86.133.104/peliculas/${id}`)
        .then(response => {
          this.pelicula = response.data; // Asigna los datos de la película al objeto
          console.log(this.pelicula);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  reproducirPelicula(): void {
    const urlpelicula = this.pelicula.urlpelicula;
    this.router.navigate(['/navigator/serie-pelis/'+this.pelicula._id+'/video'], { queryParams: { urlpelicula } });
  }
}