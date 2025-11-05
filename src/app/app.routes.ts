import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Sala } from './componentes/sala/sala';
import { Pelicula } from './componentes/pelicula/pelicula';
import { Login } from './componentes/login/login';
import { Usuario } from './componentes/usuario/usuario';
import { Cartelera } from './componentes/cartelera/cartelera';
import { Horario } from './componentes/horario/horario';
import { Detalle } from './componentes/detalle/detalle';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'sala', component: Sala
    },
    {
        path: 'sala/crear', component: Sala
    },
    {
        path: 'sala/actualizar/:id', component: Sala
    },
    {
        path: 'pelicula', component: Pelicula
    },
    {
        path: 'pelicula/crear', component: Pelicula
    },
    {
        path: 'pelicula/actualizar/:id', component: Pelicula
    },
    {
        path: 'pelicula/detalle/:id', component: Detalle
    },
    {
        path: 'cartelera', component: Cartelera
    },
    {
        path: 'cartelera/crear', component: Horario
    },
    {
        path: 'cartelera/actualizar/:id', component: Horario
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'usuario', component: Usuario
    },
    {
        path: 'usuario/crear', component: Usuario
    },
    {
        path: '**/*', component: Home
    }
];
