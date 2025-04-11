import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor() {}

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetch(`${this.apiUrl}/${randomId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Pokemon:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching Pokemon:', error);
        throw error;
      }
    );
  }
}
