import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getRandomPokemon(): Observable<any> {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return this.http.get(`${this.apiUrl}/${randomId}`);
  }
}
