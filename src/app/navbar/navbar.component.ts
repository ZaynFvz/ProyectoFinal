import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'showtime';
  navbg:any;

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('document:scroll') scrollover(){
    console.log(document.body.scrollTop,'scrolllength#');
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
    {
      this.navbg = {
        'background-color':'#000000'
      }
    }else
    {
        this.navbg = {}
    }
  }
  logout(): void {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de cerrar sesión
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
