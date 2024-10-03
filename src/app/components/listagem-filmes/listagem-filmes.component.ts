import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.models';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmesFavoritosComponent } from '../filmes-favoritos/filmes-favoritos.component';
import { BarraBuscaComponent } from '../barra-busca/barra-busca.component';

@Component({
  selector: 'app-listagem-filmes',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink,
    NgIf,
    FilmesFavoritosComponent,
    BarraBuscaComponent,
  ],
  templateUrl: './listagem-filmes.component.html',
  styleUrl: './listagem-filmes.component.scss',
})
export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];
  public pagina: number;
  public filmesFavoritos: FilmeFavorito[];

  constructor(
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService
  ) {
    this.filmes = [];
    this.pagina = 0;
    this.filmesFavoritos = [];
  }

  ngOnInit(): void {
    this.buscarProximosFilmesPopulares();
    this.filmesFavoritos = this.localStorageService.obterFavoritos();
  }

  public buscarProximosFilmesPopulares() {
    this.pagina++;
    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((f) => {
      const resultados = f.results as any[];

      this.filmes = resultados.map(this.mapearListagemResultados);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  public buscarFilmesPopularesAnteriores() {
    this.pagina--;
    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((f) => {
      const resultados = f.results as any[];

      this.filmes = resultados.map(this.mapearListagemResultados);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  public mapearCorDaNota(porcetagemNota: string): string {
    const numeroNota = Number(porcetagemNota);

    if (numeroNota > 75) return 'app-borda-nota-alta';
    else if (numeroNota > 50) return 'app-borda-nota-media';
    else if (numeroNota > 30) return 'app-borda-nota-baixa';
    else return 'app-borda-nota-mais-baixa';
  }
  private mapearListagemResultados(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }
}
