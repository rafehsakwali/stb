import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7156/api/Users'; // Remplacez avec votre port réel

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

login(data: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
}

}
