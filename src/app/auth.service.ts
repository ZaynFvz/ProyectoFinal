import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }
}
