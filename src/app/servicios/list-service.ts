import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { API_REST } from '../utils/env';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  public generos: Array<any> = new Array();
  public peliculas: Array<any> = new Array();

  constructor(
    @Inject(HttpService) public httpService: HttpService
  ) {
    this.loadGeneros();
  }

  private async loadGeneros() {
    try {
      let response: any = await this.httpService.get(API_REST + "genero/list", new HttpHeaders());
      if (response.status === 200) {
        this.generos = response.body;
      }
    } catch (e: any) {
      this.generos = new Array();
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

  private async loadPeliculas() {
    try {
      let response: any = await this.httpService.get(API_REST + "pelicula/list", new HttpHeaders());
      if (response.status === 200) {
        this.generos = response.body;
      }
    } catch (e: any) {
      this.generos = new Array();
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }
}
