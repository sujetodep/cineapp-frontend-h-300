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
  public salas: Array<any> = new Array();
  public carteleras: Array<any> = new Array();

  public readonly dias: Array<any> = [
    { dia: "lun", nombre: "Lunes" },
    { dia: "mar", nombre: "Martes" },
    { dia: "mie", nombre: "Miércoles" },
    { dia: "jue", nombre: "Jueves" },
    { dia: "vie", nombre: "Viernes" },
    { dia: "sab", nombre: "Sábado" },
    { dia: "dom", nombre: "Domingo" }
  ];

  public readonly horas: Array<any> = [
    { hora: "10", nombre: "10:00" },
    { hora: "12", nombre: "12:00" },
    { hora: "14", nombre: "14:00" },
    { hora: "16", nombre: "16:00" },
    { hora: "18", nombre: "18:00" },
    { hora: "20", nombre: "20:00" },
    { hora: "22", nombre: "22:00" }
  ];

  constructor(
    @Inject(HttpService) public httpService: HttpService
  ) {
    this.loadAll();
  }

  private loadAll() {
    this.loadPeliculas();
    this.loadGeneros();
    this.loadSalas();
    this.loadCarteleras();
  }

  public async loadGeneros() {
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

  public async loadPeliculas() {
    try {
      let response: any = await this.httpService.get(API_REST + "pelicula/list", new HttpHeaders());
      if (response.status === 200) {
        this.peliculas = response.body;
      }
    } catch (e: any) {
      this.peliculas = new Array();
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

  public async loadSalas() {
    try {
      let response: any = await this.httpService.get(API_REST + "sala/list", new HttpHeaders());
      if (response.status === 200) {
        this.salas = response.body;
      }
    } catch (e: any) {
      this.salas = new Array();
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

  public async loadCarteleras() {
    try {
      let response: any = await this.httpService.get(API_REST + "cartelera/list", new HttpHeaders());
      if (response.status === 200) {
        this.carteleras = response.body;
      }
    } catch (e: any) {
      this.carteleras = new Array();
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

  public nombreGenero(code: any): any {
    console.log('code => ', code);
    return this.generos.find(g => g.codigo === code)?.nombre;
  }

  listProyecciones(list: Array<any>): Array<any> {
    return list.filter(d => d)
      .map(d => this.dias.filter(p => d === p.dia)
        .map(p => p.nombre));
  }

  listHorarios(list: Array<any>): Array<any> {
    return list.filter(d => d)
      .map(d => this.horas.filter(p => d === p.hora)
        .map(p => p.nombre));
  }
}
