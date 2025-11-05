import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../servicios/http-service';
import { API_REST } from '../../utils/env';
import { HttpHeaders } from '@angular/common/http';
import { setLocalStorage } from '../../utils/storage';
import { SessionService } from '../../servicios/session-service';

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss',
})
export class Usuario {
  public form: FormGroup = {} as FormGroup;

  constructor(
    @Inject(HttpService) public httpService: HttpService,
    @Inject(SessionService) public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null,
          [
            Validators.required,
            Validators.email
          ]
        ),
        contrasenia: new FormControl(null, Validators.required)
      }
    );
  }

  async guardar() {
    try {
      let endPoint = this.sessionService.sesionIniciada ? "actualizar" : "crear";
      let response = await this.httpService.post(API_REST + "usuario/" + endPoint
        , this.form.getRawValue()
        , new HttpHeaders());

      if (response.status === 200) {
        setLocalStorage("Usuario", response.body, true);
        window.alert("Usuario actualizado correctamente");
        this.sessionService.irALogin();
      } else if (response.status === 201) {
        setLocalStorage("Usuario", response.body, true);
        window.alert("Usuario creado correctamente");
        window.location.href = "/";
      }
    } catch (e: any) {
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }

}
