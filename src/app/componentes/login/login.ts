import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from '../../servicios/http-service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setLocalStorage } from '../../utils/storage';
import { API_REST } from '../../utils/env';
import { SessionService } from '../../servicios/session-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  public form: FormGroup = {} as FormGroup;

  constructor(
    @Inject(HttpService) public httpService: HttpService,
    @Inject(SessionService) public sessionService: SessionService
  ) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        correo: new FormControl(null,
          [
            Validators.required,
            Validators.email
          ]
        ),
        contrasenia: new FormControl(null, Validators.required),
      }
    );
  }

  async login() {
    try {
      let response = await this.httpService.post(API_REST + "auth/login"
        , this.form.getRawValue()
        , new HttpHeaders());
      if (response.status === 200) {
        setLocalStorage("Authorization", 'Bearer ' + response.body.token);
        setLocalStorage("Usuario", response.body, true);
        this.sessionService.montarSesion();
        window.location.href = "/";
      }
    } catch (e: any) {
      if (e.status) {
        window.alert(e.error.mensaje);
      }
    }
  }
}
