import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
      // Realiza cualquier acción adicional necesaria después del inicio de sesión exitoso
      this.router.navigate(['/home']); // Redirecciona al componente deseado
    } catch (error) {
      // Ocurrió un error durante el inicio de sesión
      console.error(error);
      this.errorMessage = 'Credenciales de inicio de sesión incorrectas. Inténtalo de nuevo.';
    }
  }
}
