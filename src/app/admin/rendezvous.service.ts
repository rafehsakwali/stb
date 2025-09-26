import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RendezVous {
  idRendezVous: number;
  nomClient: string;
  telephone: string;
  vehicule: string;
  dateRendezVous: string;
}

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'https://localhost:7156/api/RendezVous'; // adapte le port

  constructor(private http: HttpClient) {}

  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }
}
