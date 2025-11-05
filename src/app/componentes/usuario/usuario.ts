import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../servicios/http-service';
import { API_REST } from '../../utils/env';
import { HttpHeaders } from '@angular/common/http';
import { setLocalStorage } from '../../utils/storage';
import { SessionService } from '../../servicios/session-service';
import { BaseComponent } from '../base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss',
})
export class Usuario extends BaseComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;
  public title: string = '';

  constructor(
    @Inject(HttpService) public httpService: HttpService,
    @Inject(SessionService) public override sessionService: SessionService,
    private router: Router
  ) {
    super(sessionService);
  }

  override ngOnInit() {
    if (this.router.url === "/usuario/crear") {
      this.logout(false);
    } else {
      super.ngOnInit();
    }

    if (this.sessionService.usuario.nombre !== null) {
      this.title = "Modificar mis datos";
    } else {
      this.title = "¡Registrarme!";
    }

    this.form = new FormGroup(
      {
        _id: new FormControl(this.sessionService.usuario._id),
        nombre: new FormControl(this.sessionService.usuario.nombre, Validators.required),
        correo: new FormControl(this.sessionService.usuario.correo,
          [
            Validators.required,
            Validators.email
          ]
        ),
        contrasenia: new FormControl(this.sessionService.usuario.contrasenia, !this.sessionService.sesionIniciada ? Validators.required : Validators.nullValidator),
        rol: new FormControl(this.sessionService.usuario.rol, Validators.required)
      }
    );
  }

  async guardar() {
    try {
      let response = null;
      if (this.sessionService.sesionIniciada) {
        response = await this.httpService.postAuth(API_REST + "usuario/actualizar"
          , this.form.getRawValue()
          , new HttpHeaders());
      } else {
        response = await this.httpService.post(API_REST + "usuario/crear"
          , this.form.getRawValue()
          , new HttpHeaders());
      }

      if (response.status === 200) {
        setLocalStorage("Usuario", response.body, true);
        window.alert("Usuario actualizado correctamente");
        this.sessionService.ir("/");
      } else if (response.status === 201) {
        setLocalStorage("Usuario", response.body, true);
        window.alert("Usuario creado correctamente");
        this.sessionService.irALogin();
      }
    } catch (e: any) {
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }
}
