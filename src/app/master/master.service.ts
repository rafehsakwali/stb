import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RendezVous {
  idRendezVous?: number;
  nomClient: string;
  telephone?: string;
  vehicule?: string;
  dateRendezVous: string;
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiUrl = 'https://localhost:7156/api/RendezVous'; // <== mettez votre URL

  constructor(private http: HttpClient) {}

  getRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  addRendezVous(rdv: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rdv);
  }
}
