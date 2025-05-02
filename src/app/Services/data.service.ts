// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Define una interfaz opcional para tu usuario:
export interface Usuario {
  email: string;
  password: string; // Solo para login/registro (nunca se almacena)
  nombres?: string; // Opcional (no necesario para login)
  apellidos?: string;
  usuarioNombre?: string;
  rol?: string;
  salt?: string; // Solo para registro (backend debe generarlo)
}

// Define una interfaz para el usuario logeado
export interface LoginResponse {
  token: string;
  expiraEn: string;
  usuario: {
    UsuarioNombre: string;
    rol: string;
  };
}

// Interfaz para creación de peticiones
export interface Peticion {
  correo: string;
  motivo: string;
  nivel: number;            // Cambiar de string → number
  fecha?: Date;             // Puedes dejarla opcional
  comentarios: string;      // Cambiar 'comentario' → 'comentarios'
}



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlUsuarios = 'http://localhost:5062/pulee/Usuarios'; // <-- Pega aquí tu URL exclusiva para usuarios
  private apiUrlEncuesta = 'http://localhost:5062/pulee/Encuesta'; // <-- Pega aquí tu URL exclusiva para encuestas

  constructor(
    private http: HttpClient
    ) {}

  // Registro (envía todo el objeto Usuario)
  registrarUsuario(usuario: Omit<Usuario, 'salt'>): Observable<any> {
    return this.http.post(`${this.apiUrlUsuarios}/register`, usuario, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Login (solo necesita email y password)
  iniciarSesion(credenciales: { Datauser: string, Password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrlUsuarios}/login`,
      credenciales,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo centralizado de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en DataService:', error);
    return throwError(() => ({
      status: error.status,
      message: error.error?.message || 'Error desconocido'
    }));
  }


  //   SECCION DE ENCUESTA
  GenerarQueja(queja: Peticion): Observable<Peticion> {
    return this.http.post<Peticion>(`${this.apiUrlEncuesta}`, queja, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }
  
}
