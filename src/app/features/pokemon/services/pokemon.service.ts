import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PokemonList, PokemonBasic } from '../model/pokemon-list.model';
import { Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private typeUrl = 'https://pokeapi.co/api/v2/type';

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

      catchError((error) => throwError(() => error)),
    );
  }

  buscarPokemon(nombre: string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.baseUrl}/${nombre}`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  getDetalleTipo(tipo: string): Observable<any> {
    return this.http
      .get(`${this.typeUrl}/${tipo}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
