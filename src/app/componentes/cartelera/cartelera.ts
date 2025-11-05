import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from '../../servicios/list-service';
import { BaseComponent } from '../base';
import { SessionService } from '../../servicios/session-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cartelera.html',
  styleUrl: './cartelera.scss',
})
export class Cartelera extends BaseComponent implements OnInit {
  public peliculas: Array<any> = new Array();

  constructor(
    @Inject(ListService) public listService: ListService,
    @Inject(SessionService) public override sessionService: SessionService
  ) {
    super(sessionService);
  }

  override async ngOnInit() {
    super.ngOnInit();
    await this.listService.loadPeliculas();
    this.peliculas = this.listService.peliculas;
  }

  filtrarCategoria(genero: string) {
    this.peliculas = this.listService.peliculas
      .filter(p => p.genero === genero)
      .map(p => p);
  }
}
