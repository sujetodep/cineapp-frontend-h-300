import { Component, Inject, OnInit } from '@angular/core';
import { SessionService } from '../../servicios/session-service';
import { BaseComponent } from '../base';
import { HttpService } from '../../servicios/http-service';
import { ListService } from '../../servicios/list-service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { API_REST } from '../../utils/env';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sala',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sala.html',
  styleUrl: './sala.scss',
})
export class Sala extends BaseComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;
  public title: string = '';
  public actualizarRegistro: boolean = false;
  public id: string = '';

  public sala: any = {
    _id: null,
    nombre: null,
    descripcion: null
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
      await this.listService.loadSalas();
      let sala = this.listService.salas.find(p => p._id === this.id);
      this.title = "Modificar sala";
      this.actualizarRegistro = true;
      if (sala === undefined) {
        this.id = null!;
      } else {
        this.sala = sala;
      }
    }

    if (this.id === null) {
      this.title = "Crear sala";
      this.actualizarRegistro = false;
    }

    this.form = new FormGroup(
      {
        _id: new FormControl(this.sala._id, this.sala.nombre !== null ? Validators.required : Validators.nullValidator),
        nombre: new FormControl(this.sala.nombre, Validators.required),
        descripcion: new FormControl(this.sala.descripcion, Validators.required)
      }
    );
  }

  async guardar() {
    try {
      let response = null;
      let body = this.form.getRawValue();
      if (this.actualizarRegistro) {
        response = await this.httpService.postAuth(API_REST + "sala/actualizar"
          , body
          , new HttpHeaders());
      } else {
        body._id = undefined;
        response = await this.httpService.postAuth(API_REST + "sala/crear"
          , body
          , new HttpHeaders());
      }

      if (response.status === 200) {
        window.alert("Sala actualizada correctamente");
      } else if (response.status === 201) {
        window.alert("Sala creada correctamente");
      }
      this.listService.loadSalas();
      this.sessionService.ir("/cartelera")
    } catch (e: any) {
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

}
