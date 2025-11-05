import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Sala } from './componentes/sala/sala';
import { Pelicula } from './componentes/pelicula/pelicula';
import { Login } from './componentes/login/login';
import { Usuario } from './componentes/usuario/usuario';
import { Cartelera } from './componentes/cartelera/cartelera';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'salas', component: Sala
    },
    {
        path: 'pelicula', component: Pelicula
    },
    {
        path: 'cartelera', component: Cartelera
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'usuario', component: Usuario
    },
    {
        path: '**/*', component: Home
    }
];
