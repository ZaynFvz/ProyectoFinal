import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import 'plyr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  nombres: string | undefined;
  apellidos: string | undefined;
  fecha_nacimiento: Date | undefined;
  constructor(private router: Router, private auth: Auth, private http: HttpClient) {}

  register() {
    if (this.email && this.password) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Registro exitoso, obtén el ID de usuario
          const userId = userCredential.user?.uid;
  
          if (userId) {
            // Guarda los datos en Firebase Realtime Database
            const userData = {
              email: this.email,
              nombres: this.nombres,
              apellidos: this.apellidos,
              rol: "user",
              fecha_nacimiento: this.fecha_nacimiento
              // Agrega aquí otros datos que desees guardar
            };
            this.http.put(`https://proyectofinal-abd5f-default-rtdb.firebaseio.com/users/${userId}.json`, userData)
              .subscribe(
                () => {
                  Swal.fire({
                    title: 'Éxito',
                    text: 'Se ha iniciado sesión correctamente',
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
                  
                },
                (error) => {
                  // Error al guardar los datos
                  console.error(error);
                  Swal.fire({
                    title: 'Fallo',
                    text: 'Ha ocurrido un error al intentar crear su usuario, compruebe su conexión a internet e inténtelo de nuevo',
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
                  this.errorMessage = 'Error durante el registro. Por favor, inténtalo de nuevo.';
                }
              );
          }
        })
        .catch((error: any) => {
          // Ocurrió un error durante el registro
          console.error(error);
          this.errorMessage = 'Error durante el registro. Por favor, inténtalo de nuevo.';
        });
    }
  }
}
