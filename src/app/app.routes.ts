import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Sala } from './componentes/sala/sala';
import { Pelicula } from './componentes/pelicula/pelicula';
import { Login } from './componentes/login/login';
import { Usuario } from './componentes/usuario/usuario';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'sala', component: Sala
    },
    {
        path: 'pelicula', component: Pelicula
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
