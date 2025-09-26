import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../sign/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  standalone: true,
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class SignComponent {
  registerData = {
    Username: '',
    Password: '',
    ConfirmPassword: '',
    Email: ''
  };

  loginData = {
    Username: '',
    Password: '',
    Email: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Fonction pour l'inscription
  onRegister() {
    // Vérifier si un champ est vide
    if (!this.registerData.Username || !this.registerData.Password || !this.registerData.ConfirmPassword || !this.registerData.Email) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (this.registerData.Password !== this.registerData.ConfirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    // Appel au service d'inscription
    this.authService.register(this.registerData).subscribe({
      next: () => alert('Inscription réussie !'),
      error: () => alert('Erreur lors de l\'inscription')
    });
  }

  // Fonction pour la connexion
  onLogin() {
    // Vérifier si un champ est vide
    if (!this.loginData.Username || !this.loginData.Password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Appel au service de login
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/admin']); // Redirection après connexion
        } else {
          alert('Identifiants incorrects.');
        }
      },
      error: () => alert('Erreur lors de la connexion.')
    });
  }
}
