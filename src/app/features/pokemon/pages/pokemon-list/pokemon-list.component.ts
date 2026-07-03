import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../model/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: false,
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  cargando: boolean = true;
  error: string = '';
  offset: number = 0;
  pagina: number = 1;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons(): void {
    this.cargando = true;
    this.pokemonService.getPokemons(this.offset).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los pokémon';
        this.cargando = false;
      },
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
}
