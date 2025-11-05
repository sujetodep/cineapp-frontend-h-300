import { Injectable } from '@angular/core';
import { getLocalStorage } from '../utils/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public usuario: any = {
    _id: null,
    nombre: null,
    correo: null,
    rol: null
  };
  public sesionIniciada = false;
  public authorization = getLocalStorage("Authorization");

  constructor(
    private router: Router
  ) {
    this.montarSesion();
  }

  ir(route: string) {
    this.router.navigate([route]);
  }

  montarSesion() {
    let usuario = getLocalStorage("Usuario", true);
    this.authorization = getLocalStorage("Authorization");
    this.sesionIniciada = this.authorization !== "";

    if (this.sesionIniciada) {
      this.usuario = usuario;
    }
  }

  irALogin() {
    if (!this.sesionIniciada && this.router.url !== "/login") {
      this.ir("/login");
    }
  }
}
