import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { User } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'showtime';
  navbg:any;
  user: User | null = null;
  isAdmin: boolean = false;
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

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then((user) => {
        this.user = user;
        console.log("USUARIO LOGUEADO:", user?.uid);

        if (user) {
          // Obtener la referencia a la Realtime Database
          const db = getDatabase();
          const userRef = ref(db, 'users/' + user.uid); // Asegúrate de ajustar la ruta a tu estructura de datos en Realtime Database

          // Realizar la consulta a la Realtime Database
          onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.rol === 'admin') {
              this.isAdmin = true;
              console.log("ROL: "+userData.rol)
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);
      });
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

  redirigir():void{
    this.router.navigate(['/admin']);
  }

}
