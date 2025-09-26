import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fiche {
  idFiche: number;
  idRendezVous: number;
  nomClient: string;
  telephone: string;
  vehicule: string;
  dateRendezVous: string;
  diagnostique?: string;
  remarques?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FicheService {
  // ⚡ URL corrigée pour utiliser le bon endpoint du backend
  private apiUrl = 'https://localhost:7156/api/FicheInspection';

  constructor(private http: HttpClient) {}

  // ⚡ GET par IdRendezVous
  getFicheByRdv(idRdv: number): Observable<Fiche> {
    return this.http.get<Fiche>(`${this.apiUrl}/ByRendezVous/${idRdv}`);
  }
}
