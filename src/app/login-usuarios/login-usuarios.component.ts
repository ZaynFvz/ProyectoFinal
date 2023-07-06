import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-usuarios',
  templateUrl: './login-usuarios.component.html',
  styleUrls: ['./login-usuarios.component.css']
})
export class LoginUsuariosComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private router: Router) {}

  async login(email: string, password: string) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // El usuario ha iniciado sesión exitosamente
      console.log(userCredential.user);
      Swal.fire({
        title: 'Éxito',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'netflix-alert',
          title: 'swal2-title',
          actions: 'swal2-actions',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then(async (result) => {
        this.router.navigate(['/navigator']);
      });
      // Realiza cualquier acción adicional necesaria después del inicio de sesión exitoso
       // Redirecciona al componente deseado
    } catch (error) {
      // Ocurrió un error durante el inicio de sesión
      console.error(error);
      Swal.fire({
        title: 'Fallo',
        text: 'Credenciales de inicio de sesión incorrectas. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'netflix-alert',
          title: 'swal2-title',
          actions: 'swal2-actions',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then(async (result) => {
        
      });
      this.errorMessage = 'Credenciales de inicio de sesión incorrectas. Inténtalo de nuevo.';
    }
  }
}
