import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FicheInspectionService {
  private apiUrl = 'https://localhost:7156/api/FicheInspection'; 

  constructor(private http: HttpClient) {}

  createFiche(fiche: any): Observable<any> {
    return this.http.post(this.apiUrl, fiche);
  }
}
