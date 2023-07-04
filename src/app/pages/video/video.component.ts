import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  urlPelicula: string | null = null;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    const player = new Plyr(this.videoPlayer.nativeElement, {
      // Configuración adicional del reproductor de video (opcional)
    });
  }

  ngOnInit(): void {
    const player = new Plyr('#player');
    this.route.queryParams.subscribe(params => {
      this.urlPelicula = params['urlpelicula'];
      // Aquí puedes realizar las acciones necesarias con la variable urlPelicula recibida
    });
  }
}
