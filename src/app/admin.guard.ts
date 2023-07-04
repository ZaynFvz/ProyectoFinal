import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          const userId = user.uid;
          const db = getDatabase();
          const roleRef = ref(db, `users/${userId}/rol`);
          onValue(roleRef, (snapshot) => {
            const role = snapshot.val();
            if (role === 'admin') {
              resolve(true); // El usuario es admin, permite el acceso a la ruta
            } else {
              this.router.navigate(['/home']); // No hay usuario admin, redirige a la página principal
              resolve(false);
            }
          }, (error) => {
            console.error(error);
            reject(false);
          });
        } else {
          this.router.navigate(['/login']); // No hay usuario autenticado, redirige a la página de inicio de sesión
          resolve(false);
        }
      });
    });
  }
}
