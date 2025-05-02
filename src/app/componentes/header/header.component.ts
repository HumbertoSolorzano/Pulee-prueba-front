import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterLinkActive} from '@angular/router'; // 👈 Añade esta importación
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true, // 👈 Asegúrate de que es standalone
  imports: [RouterModule,RouterLink,RouterLinkActive], // 👈 Añade RouterModule aquí
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  Title = signal('Pulee');
  menuOpen = signal(false);
  avatarUrl = signal('');
  usuario = signal<any>(null); // 🔥 Mejor aún: usuario como SIGNAL

  private platformId = inject(PLATFORM_ID); // revisa el localsotrage del navegador

  constructor(private router: Router) {
    this.cargarUsuario(); // 👈 aquí lo solucionas
  }

  MenuItems = signal([
    { name: 'Mapas', path: '/Mapa' },
    { name: 'Historia', path: '/history' },
    { name: 'Servicios', path: '/services' },
  ]);

  ToggleMenu()
  {
    this.menuOpen.update(prev => !prev);
  }

  cargarUsuario(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioGuardado = localStorage.getItem('Usuario');
      if (usuarioGuardado) {
        this.usuario.set(JSON.parse(usuarioGuardado));
        this.generarAvatarAleatorio();
      }
    }
  }

  generarAvatarAleatorio(): void {
    const avatares = [
      'assets/imagenes/header_session/avatar1.jpg',
      'assets/imagenes/header_session/avatar2.jpg',
      'assets/imagenes/header_session/avatar3.jpg',
      'assets/imagenes/header_session/avatar4.jpg',
      'assets/imagenes/header_session/avatar5.jpg',
      'assets/imagenes/header_session/avatar6.jpg',
      'assets/imagenes/header_session/avatar7.jpg'
    ];
    const indice = Math.floor(Math.random() * avatares.length);
    this.avatarUrl.set(avatares[indice]);
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('Usuario');
    this.usuario.set(null);
    this.router.navigate(['/']);
  }
}