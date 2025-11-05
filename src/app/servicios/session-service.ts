import { Injectable } from '@angular/core';
import { getLocalStorage, getSessionStorage } from '../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public usuario: any = {
    nombre: null,
    correo: null,
    rol: null
  };
  public sesionIniciada = false;
  public authorization = getLocalStorage("Authorization");

  constructor() {
    this.montarSesion();
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
    if (!this.sesionIniciada) {
      window.location.href = "/login";
    }
  }
}
