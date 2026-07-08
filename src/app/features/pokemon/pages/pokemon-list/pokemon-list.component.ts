import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../model/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: false
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  pokemonsFiltrados: Pokemon[] = [];
  cargando: boolean = true;
  error: string = '';
  offset: number = 0;
  pagina: number = 1;
  busqueda = new FormControl('');
  tipoDetalle: any = null;
  tipoSeleccionado: string = '';
  errorBusqueda: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.cargarPokemons();

    this.busqueda.valueChanges.pipe(
      debounceTime(400),
      switchMap((texto) => {
        if (!texto || texto.trim() === '') {
          this.pokemonsFiltrados = this.pokemons;
          this.errorBusqueda = '';
          return of(null);
        }

        const filtrados = this.pokemons.filter(p =>
          p.name.toLowerCase().includes(texto.toLowerCase())
        );

        if (filtrados.length > 0) {
          this.pokemonsFiltrados = filtrados;
          this.errorBusqueda = '';
          return of(null);
        }

        this.errorBusqueda = '';
        return this.pokemonService.buscarPokemon(texto.toLowerCase()).pipe(
          catchError(() => {
            this.errorBusqueda = 'Pokémon no encontrado';
            this.pokemonsFiltrados = [];
            return of(null);
          })
        );
      })
    ).subscribe((pokemon) => {
      if (pokemon) {
        this.pokemonsFiltrados = [pokemon];
      }
    });
  }

  cargarPokemons(): void {
    this.cargando = true;
    this.pokemonService.getPokemons(this.offset).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.pokemonsFiltrados = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los pokémon';
        this.cargando = false;
      }
    });
  }

  siguiente(): void {
    this.offset += 20;
    this.pagina++;
    this.cargarPokemons();
  }

  anterior(): void {
    if (this.offset > 0) {
      this.offset -= 20;
      this.pagina--;
      this.cargarPokemons();
    }
  }

  verDetalleTipo(tipo: string): void {
    this.tipoSeleccionado = tipo;
    this.pokemonService.getDetalleTipo(tipo).subscribe({
      next: (data) => {
        this.tipoDetalle = data;
      },
      error: () => {
        this.tipoDetalle = null;
      }
    });
  }

  cerrarDetalle(): void {
    this.tipoDetalle = null;
    this.tipoSeleccionado = '';
  }
}