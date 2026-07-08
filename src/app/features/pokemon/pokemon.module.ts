import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [PokemonCardComponent, PokemonListComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [PokemonListComponent],
})
export class PokemonModule {}
