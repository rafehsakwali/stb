import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface FicheInspection {
  id?: number;
  commandeTravaux: string;
  agent: string;
  nomPrenom: string;
  telephone: string;
  immatriculation: string;
  vin: string;
  kilometrage: number;
  motorisation: string;
  idRendezVous: number;
  plaquesPolice: string;
  vitresPareBrise: string;
  balaisEssuieGlace: string;
  eclairage: string;
  retroviseurs: string;
  pneus: string;
  commentaireTour: string;
  controleVehicule: string;
  commentaire40Points: string;
  controleCapot: string;
  commentaireCapot: string;
  controleSousVehicule: string;
  commentaireSousVehicule: string;
  autresPrestations: string;
  commentairePrestations: string;
}

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FicheComponent implements OnInit {

  fiche: FicheInspection | null = null;
  idRendezVous!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const idRdvParam = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré du route:', idRdvParam);

    if (idRdvParam) {
      this.idRendezVous = +idRdvParam;
      this.getFicheByRdv(this.idRendezVous);
    } else {
      console.error('Aucun ID de rendez-vous trouvé dans l’URL.');
      alert('ID de rendez-vous manquant.');
    }
  }

  getFicheByRdv(idRdv: number) {
    console.log('Appel backend pour IdRendezVous:', idRdv);

    this.http.get<FicheInspection>(`https://localhost:7156/api/FicheInspection/ByRendezVous/${idRdv}`)
      .subscribe({
        next: (data) => {
          console.log('Fiche reçue:', data);
          this.fiche = data;
        },
        error: (err) => {
          console.error('Erreur HTTP:', err);
          alert('Erreur lors de la récupération de la fiche.');
        }
      });
  }
}
