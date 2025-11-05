import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../servicios/session-service';
import { setLocalStorage } from '../../utils/storage';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  constructor(
    @Inject(SessionService) public sessionService: SessionService
  ) { }
  ngOnInit(): void { }

  ngAfterViewChecked() {
    this.sessionService.montarSesion();
    if (window.location.pathname !== "/login") {
      this.sessionService.irALogin();
    }
  }


  logout() {
    setLocalStorage("Authorization", "");
    setLocalStorage("Usuario", "{}", true);
    this.sessionService.irALogin();
  }
}
