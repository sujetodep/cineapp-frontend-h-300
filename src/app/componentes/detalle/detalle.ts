import { Component, Inject, OnInit } from '@angular/core';
import { ListService } from '../../servicios/list-service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base';
import { SessionService } from '../../servicios/session-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [
    CommonModule
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss',
})
export class Detalle extends BaseComponent implements OnInit {
  public id: string = '';

  public pelicula: any = {
    _id: null,
    titulo: null,
    descripcion: null,
    portada: null,
    genero: null
  };

  constructor(
    @Inject(ListService) public listService: ListService,
    @Inject(SessionService) public override sessionService: SessionService,
    private route: ActivatedRoute
  ) {
    super(sessionService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  async ngAfterContentInit() {
    this.id = this.route.snapshot.paramMap.get("id")!;
    if (this.id !== null) {
      await this.listService.loadPeliculas();
      await this.listService.loadGeneros();
      let pelicula = this.listService.peliculas.find(p => p._id === this.id);

      if (pelicula === undefined) {
        this.id = null!;
      } else {
        this.pelicula = pelicula;
      }
    }
  }
}
