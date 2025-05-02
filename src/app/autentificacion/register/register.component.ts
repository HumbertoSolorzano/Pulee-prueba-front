import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Usuario } from '../../Services/data.service';
import { ToastService } from '../../Services/toast.service'; // Ahora usamos el servicio

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], // Corrigiendo imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent { 

  formRegistro!: FormGroup; // Ahora el form es un FormGroup
  submitted = false; // Para manejar el estado de envío

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router // Inyectamos el servicio, NO el componente
    ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formRegistro = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', [Validators.required]], // Para confirmar
      usuarioNombre: ['', [Validators.required, Validators.pattern(/^[a-zñáéíóú_]+$/i)]],//Sin caracteres especiales
      rol: ['guardian', Validators.required] // Rol fijo aquí
    }, { validator: this.passwordsIguales }); // Validación personalizada
  }

  private passwordsIguales(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmarPass = form.get('confirmarPassword')?.value;
    return pass === confirmarPass ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (!this.validarFormulario()) {
      // El formulario está mal, no sigas
      return;
    }

    const datos: Usuario = {
      email: this.formRegistro.value.email,
      password: this.formRegistro.value.password,
      nombres: this.formRegistro.value.nombres,
      apellidos: this.formRegistro.value.apellidos,
      usuarioNombre: this.formRegistro.value.usuarioNombre,
      rol: 'guardian', // Rol fijo aquí
    };

    if (this.formRegistro.invalid) {
      console.log('Errores específicos:', {
        passwordsMatch: this.formRegistro.hasError('passwordsMismatch'),
        email: this.formRegistro.get('email')?.errors,
        password: this.formRegistro.get('password')?.errors
      });
      return;
    }
    
    console.log('Datos a enviar:', JSON.stringify(datos, null, 2));
    this.dataService.registrarUsuario(datos).subscribe({
      next: (res) => {
        this.toastService.showToast('Se ha creado el Usuario', 'success');
        this.router.navigate(['/Ingreso']);
      },
      error: (err) => {
        console.error('Detalles del error:', {
          status: err.status,
          error: err.error,  // ¡Esto contiene los detalles del error del backend!
          headers: err.headers
        });
        if (err.status === 409) {
          // Error de conflicto (correo o nombre ya existe)
          this.toastService.showToast('El correo o el nombre de usuario ya están registrados. Intenta con otros.', 'error');
        } else if (err.status >= 500) {
          // Error interno del servidor
          this.toastService.showToast('Ocurrió un error en el servidor. Por favor intenta más tarde.', 'server-error');
        } else {
          // Error genérico
          this.toastService.showToast('Ocurrió un error. Intenta nuevamente.', 'alert');
        }
      }
    });
  }

  //Lo que hacemos es validar el formulario y mostrar un mensaje específico según el error
  validarFormulario(): boolean {
    if (this.formRegistro.invalid) {
      // Si quieres ser aún más específico, puedes revisar qué campo falló
      if (this.formRegistro.get('email')?.invalid) {
        this.toastService.showToast('Por favor ingresa un correo válido.', 'info');
      } else if (this.formRegistro.get('password')?.invalid) {
        this.toastService.showToast('La contraseña debe tener mínimo 8 caracteres.', 'info');
      } else if (this.formRegistro.get('confirmarPassword')?.invalid) {
        this.toastService.showToast('Debes confirmar tu contraseña.', 'info');
      } else if (this.formRegistro.errors?.['passwordsMismatch']) {
        this.toastService.showToast('Las contraseñas no coinciden.', 'error');
      } else {
        this.toastService.showToast('Por favor completa todos los campos requeridos.', 'info');
      }
      return false;
    }
    return true;
  }
  
}
