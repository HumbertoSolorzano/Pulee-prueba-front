import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { ToastService } from '../../Services/toast.service'; // Ahora usamos el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastService: ToastService, // Inyectamos el servicio, NO el componente
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.showToast('Completa todos los campos correctamente', 'error');
      return;
    }

    const { email, password } = this.loginForm.value;


    this.dataService.iniciarSesion({ Datauser: email, Password: password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token); // Guarda el token en localStorage
        localStorage.setItem('Usuario', JSON.stringify(response.usuario)); // Guarda el usuario en localStorage

        this.toastService.showToast('Inicio de sesión exitoso', 'success');
        this.router.navigate(['/Mapa']);
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.toastService.showToast('Credenciales incorrectas', 'error');
      }
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
