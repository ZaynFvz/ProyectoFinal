import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'firebase/auth';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {
  constructor(private router: Router, private authService: AuthService){}
  user: User | null = null;
  isAdmin: boolean = false;
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

  cerrarSesion(): void {
    // Código para cerrar sesión
  
    // Ejemplo de alerta con SweetAlert
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que quieres cerrar sesión?',
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
        this.authService.logout()
          .then(() => {
            this.router.navigate(['/login']);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }
  
}
