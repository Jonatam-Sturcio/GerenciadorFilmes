import { Component, Input } from '@angular/core';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filmes-favoritos',
  standalone: true,
  imports: [NgForOf, RouterLink, NgIf],
  templateUrl: './filmes-favoritos.component.html',
  styleUrl: './filmes-favoritos.component.scss',
})
export class FilmesFavoritosComponent {
  @Input({ required: true }) filmes!: FilmeFavorito[];
}
