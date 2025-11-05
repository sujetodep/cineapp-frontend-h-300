import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base';
import { SessionService } from '../../servicios/session-service';
import { CommonModule } from '@angular/common';
import { ListService } from '../../servicios/list-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home extends BaseComponent implements OnInit {
  constructor(
    @Inject(SessionService) public override sessionService: SessionService,
    @Inject(ListService) public listService: ListService
  ) {
    super(sessionService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }
}
