import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';
import axios from 'axios';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  
  movie: any;
  constructor(private service:MovieApiServiceService,private router:ActivatedRoute,private title:Title,private meta:Meta) { }
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;
  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getparamid#');
    this.getMovie(getParamId);
  }


  getMovie(getParamId:any){
    const url = `http://54.226.134.15/peliculas/${getParamId}`;

    axios.get(url)
      .then(response => {
        this.movie = response.data;
        console.log('Detalles de la película:', this.movie);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la película:', error);
      });
  }
}