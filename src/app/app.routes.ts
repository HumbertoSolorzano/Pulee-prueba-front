// auth-routes.service.ts

import { Routes } from "@angular/router";
import { RegisterComponent } from "./autentificacion/register/register.component";
import { LoginComponent } from "./autentificacion/login/login.component";
import { MapaComponent } from "./mapa/mapa/mapa.component";

export const routes: Routes = [
    {path: '', redirectTo: 'Mapa', pathMatch: 'full'},
    {path: 'Mapa', component: MapaComponent},
    {path: 'Registro', component: RegisterComponent},
    {path: 'Ingreso', component:LoginComponent}
];