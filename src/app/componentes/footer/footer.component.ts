import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, Peticion } from '../../Services/data.service';
import { ToastService } from '../../Services/toast.service'; // Ahora usamos el servicio

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})


export class FooterComponent {

  motivos: string[] = ['Inconveniente', 'Sugerencia', 'Reclamo'];
  motivoSeleccionado: string = '';
  nivelSeleccionado: string = '0';
  emojiSeleccionado: number = 0;  // 1: triste, 2: neutral, 3: feliz

  nuevaEncuesta: Peticion = {
    correo: '',
    motivo: '',
    nivel: 0,
    fecha: new Date(),  // autoasignado
    comentarios: ''
  };
  
  @ViewChild('statusToggle') statusToggle!: ElementRef;
  constructor(private dataService: DataService, private toast: ToastService) {}

  
  seleccionarMotivo(motivo: string): void {
    this.motivoSeleccionado = motivo;
    this.nuevaEncuesta.motivo = motivo;
    this.cerrarDropdown();
  }

  seleccionarNivel(nivel: number): void {
    this.nivelSeleccionado = nivel.toString();
    this.nuevaEncuesta.nivel = nivel;
    this.emojiSeleccionado = nivel;
  }

  onSubmit(): void {
    if (!this.nuevaEncuesta.correo || !this.nuevaEncuesta.motivo || !this.nuevaEncuesta.nivel || !this.nuevaEncuesta.comentarios) {
      this.toast.showToast('Por favor completa todos los campos', 'error');
      return;
    }
  
    if (!this.esCorreoValido(this.nuevaEncuesta.correo)) {
      this.toast.showToast('Correo inválido. Por favor ingresa uno válido.', 'error');
      return;
    }
  
    this.nuevaEncuesta.fecha = new Date();
  
    this.dataService.GenerarQueja(this.nuevaEncuesta).subscribe({
      next: () => {
        this.toast.showToast('Encuesta enviada con éxito', 'success');
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al enviar encuesta:', err);
        this.toast.showToast('Error al enviar la encuesta', 'error');
      }
    });
  }
  

  resetFormulario(): void {
    this.nuevaEncuesta = {
      correo: '',
      motivo: '',
      nivel: 0,
      fecha: new Date(),
      comentarios: ''
    };
    this.motivoSeleccionado = '';
    this.nivelSeleccionado = '0';
  }

  cerrarDropdown() {
  this.statusToggle.nativeElement.checked = false;
}

private esCorreoValido(correo: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}
}