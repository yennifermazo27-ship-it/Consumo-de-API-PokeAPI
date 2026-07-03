import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PokemonList, PokemonBasic } from '../model/pokemon-list.model';
import { Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(offset: number = 0): Observable<Pokemon[]> {
    const url = `${this.baseUrl}?limit=20&offset=${offset}`;
    return this.http.get<PokemonList>(url).pipe(
      switchMap((lista: PokemonList) => {
        const peticiones = lista.results.map((p: PokemonBasic) =>
          this.http.get<Pokemon>(p.url),
        );
        return forkJoin(peticiones);
      }),
      map((pokemons: Pokemon[]) => pokemons),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
