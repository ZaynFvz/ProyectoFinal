import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then((user: User | null) => {
          if (user) {
            resolve(true); // Usuario autenticado, permite el acceso a la ruta
          } else {
            this.router.navigate(['/login']); // No hay usuario autenticado, redirige a la página de inicio de sesión
            resolve(false);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(false);
        });
    });
  }
}
