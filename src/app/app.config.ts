import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Para que funcione el httpClient


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // 🔥 Esto soluciona el error
  ],
  
};