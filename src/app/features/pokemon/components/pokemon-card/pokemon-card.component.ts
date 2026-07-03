import { Component, Input } from '@angular/core';
import { Pokemon } from '../../model/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  standalone: false,
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}
