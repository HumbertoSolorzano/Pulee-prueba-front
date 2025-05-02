import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // Para usar routerLink o router-outlet

export interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-mapa',
  standalone: true, // 🚨 Clave en Angular 17+
  imports: [
    CommonModule,
    RouterModule // Solo si necesitas routerLink o router-outlet en este componente
  ],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent {
  $locations = signal<Location[]>([
    {
      id: 1,
      name: 'Ubicación 1',
      description: 'Descripción de la ubicación 1',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: 2,
      name: 'Ubicación 2',
      description: 'Descripción de la ubicación 2',
      latitude: 34.0522,
      longitude: -118.2437
    },
    {
      id: 3,
      name: 'Ubicación 3',
      description: 'Descripción de la ubicación 3',
      latitude: 51.5074,
      longitude: -0.1278
    }
  ]); // Cambia a signal para Angular 17+
}