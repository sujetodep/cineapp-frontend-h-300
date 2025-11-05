import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../base';
import { HttpService } from '../../servicios/http-service';
import { SessionService } from '../../servicios/session-service';
import { ListService } from '../../servicios/list-service';
import { ActivatedRoute } from '@angular/router';
import { API_REST } from '../../utils/env';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './horario.html',
  styleUrl: './horario.scss',
})
export class Horario extends BaseComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;
  public title: string = '';
  public actualizarRegistro: boolean = false;
  public id: string = '';

  public cartelera: any = {
    _id: null,
    pelicula: null,
    sala: null,
    fechaInicio: null,
    fechaFin: null,
    proyecciones: null,
    horario: null
  };

  constructor(
    @Inject(HttpService) public httpService: HttpService,
    @Inject(SessionService) public override sessionService: SessionService,
    @Inject(ListService) public listService: ListService,
    private route: ActivatedRoute
  ) {
    super(sessionService);
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.id = this.route.snapshot.paramMap.get("id")!;

    if (this.id !== null) {
      await this.listService.loadPeliculas();
      let cartelera = this.listService.carteleras.find(p => p._id === this.id);
      this.title = "Modificar cartelera";
      this.actualizarRegistro = true;
      if (cartelera === undefined) {
        this.id = null!;
      } else {
        this.cartelera = cartelera;
      }
    }

    if (this.id === null) {
      this.title = "Crear cartelera";
      this.actualizarRegistro = false;
    }

    this.form = new FormGroup(
      {
        _id: new FormControl(this.cartelera._id, this.cartelera.pelicula !== null ? Validators.required : Validators.nullValidator),
        pelicula: new FormControl(this.cartelera.pelicula, Validators.required),
        sala: new FormControl(this.cartelera.sala, Validators.required),
        fechaInicio: new FormControl(this.cartelera.fechaInicio, Validators.required),
        fechaFin: new FormControl(this.cartelera.fechaFin, Validators.required),
        proyecciones: new FormControl(this.cartelera.proyecciones, Validators.required),
        horario: new FormControl(this.cartelera.horario, Validators.required)
      }
    );
  }

  async guardar() {
    try {
      let response = null;
      let body = this.form.getRawValue();
      if (this.actualizarRegistro) {
        response = await this.httpService.postAuth(API_REST + "cartelera/actualizar"
          , body
          , new HttpHeaders());
      } else {
        body._id = undefined;
        response = await this.httpService.postAuth(API_REST + "cartelera/crear"
          , body
          , new HttpHeaders());
      }

      if (response.status === 200) {
        window.alert("Cartelera actualizada correctamente");
      } else if (response.status === 201) {
        window.alert("Cartelera creada correctamente");
      }
      this.listService.loadCarteleras();
      this.sessionService.ir("/cartelera")
    } catch (e: any) {
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }
}
