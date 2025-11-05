import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from '../../servicios/http-service';
import { HttpHeaders } from '@angular/common/http';
import { API_REST } from '../../utils/env';
import { CommonModule } from '@angular/common';
import { ListService } from '../../servicios/list-service';

@Component({
  selector: 'app-cartelera',
  imports: [
    CommonModule
  ],
  templateUrl: './cartelera.html',
  styleUrl: './cartelera.scss',
})
export class Cartelera implements OnInit {

  constructor(
    @Inject(ListService) public listService: ListService
  ) { }

  async ngOnInit() {
    
  }


}
