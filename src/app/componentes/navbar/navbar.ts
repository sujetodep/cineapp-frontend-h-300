import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../servicios/session-service';
import { BaseComponent } from '../base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar extends BaseComponent implements OnInit {
  constructor(
    @Inject(SessionService) public override sessionService: SessionService
  ) {
    super(sessionService);
  }
  override ngOnInit(): void { }
}
