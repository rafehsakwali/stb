import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FicheInspectionService } from './fiche-inspection.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormComponent {
  fiche: any = {
    CommandeTravaux: '',
    Agent: '',
    NomPrenom: '',
    Telephone: '',
    Immatriculation: '',
    VIN: '',
    Kilometrage: null,
    Motorisation: '',
    IdRendezVous: null,
    PlaquesPolice: '',
    VitresPareBrise: '',
    BalaisEssuieGlace: '',
    Eclairage: '',
    Retroviseurs: '',
    Pneus: '',
    CommentaireTour: '',
    ControleVehicule: '',
    Commentaire40Points: '',
    ControleCapot: '',
    CommentaireCapot: '',
    ControleSousVehicule: '',
    CommentaireSousVehicule: '',
    AutresPrestations: '',
    CommentairePrestations: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ficheService: FicheInspectionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fiche.IdRendezVous = +id;
  }

  onSubmit() {
    this.ficheService.createFiche(this.fiche).subscribe({
      next: () => {
        alert('✅ Fiche enregistrée avec succès !');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Erreur lors de l\'enregistrement.');
      }
    });
  }
}
