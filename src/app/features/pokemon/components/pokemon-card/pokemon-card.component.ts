import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../model/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  standalone: false,
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() tipoClick = new EventEmitter<string>();

  verTipo(tipo: string): void {
    this.tipoClick.emit(tipo);
  }
}
