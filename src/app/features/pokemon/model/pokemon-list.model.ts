export interface PokemonList {
  results: PokemonBasic[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}