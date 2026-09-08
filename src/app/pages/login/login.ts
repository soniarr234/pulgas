import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstallService } from '../../services/install.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  password = '';

  error = '';

  mostrarPassword = false;

  constructor(private router: Router, public installService: InstallService) {}

  entrar(): void {
    if (this.password === 'soniaguapa') {
      localStorage.setItem('autenticado', 'true');

      this.router.navigate(['/inicio']);

      return;
    }

    this.error = 'Contraseña incorrecta';
  }
}
