import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../signmaster/auth.service';
import { RouterLink, Router } from '@angular/router'; // Ajoutez Router

@Component({
  selector: 'app-sign',
  standalone: true,
  templateUrl: './signmaster.component.html',
  styleUrls: ['./signmaster.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class SignmasterComponent {
  registerData = {
    Username: '',
    Password: '',
    ConfirmPassword: '',
    Email: ''
  };

  loginData = {
    Username: '',
    Password: '',
    Email:''
  };

  constructor(
    private authService: AuthService,
    private router: Router // Injectez le Router
  ) {}

  onRegister() {
    if (this.registerData.Password !== this.registerData.ConfirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => alert(''),
      error: () => alert('Erreur lors de l\'inscription')
    });
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/master']); // Redirection vers le formulaire
        } else {
          alert('Identifiants incorrects.');
        }
      },
      error: () => alert('Erreur lors de la connexion.')
    });
  }
}