import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenis } from '../models/tenis.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'http://localhost:3000/tenis'; 
  constructor(private http: HttpClient) { }


  getTenis(): Observable<Tenis[]> {
    return this.http.get<Tenis[]>(this.apiUrl);
  }

  getTenisById(id: number): Observable<Tenis> {
    return this.http.get<Tenis>(`${this.apiUrl}/${id}`);
  }
  addTenis(tenis: Tenis): Observable<Tenis> {
    return this.http.post<Tenis>(this.apiUrl, tenis);
  }


  updateTenis(tenis: Tenis): Observable<Tenis> {
    return this.http.put<Tenis>(`${this.apiUrl}/${tenis.id}`, tenis);
  }

  deleteTenis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}