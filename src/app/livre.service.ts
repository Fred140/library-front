import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livre {
  id?: number;
  titre: string;
  auteur: string;
  resume: string;
  publication: Date;
  couverture?: string;
  liked?: boolean; // Ajout de la propriété liked
  showShare?: boolean; // Ajout de la propriété showShare
}

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'http://localhost:3000/api/livres';
  private uploadUrl = 'http://localhost:3000/api/upload';


  constructor(private http: HttpClient) {}

  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl);
  }

  addLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl, livre);
  }

  updateLivre(livre: Livre) {
    return this.http.patch<Livre>(this.apiUrl, livre);
  }

  deleteLivre(id: number): Observable<any> {
    return this.http.request('delete', this.apiUrl, { body: { id } });
  }

   uploadCouverture(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(this.uploadUrl, formData);
  }

   getLivreById(id: number) {
    return this.http.post<Livre>('http://localhost:3000/api/livres/detail', { id });
  }
}
