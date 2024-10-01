import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme-service';
import { ListagemFilme } from '../../models/listagem-filme.models';
import { formatDate, NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-listagem-filmes',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './listagem-filmes.component.html',
  styleUrl: './listagem-filmes.component.scss',
})
export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];
  private pagina: number;

  constructor(private filmeService: FilmeService) {
    this.filmes = [];
    this.pagina = 1;
  }

  ngOnInit(): void {
    this.buscarFilmesPopulares();
  }

  public buscarFilmesPopulares() {
    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((f) => {
      const resultados = f.results as any[];

      const filmesMapeados = resultados.map(this.mapearListagemResultados);

      this.filmes.push(...filmesMapeados);

      this.pagina++;
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
      porcetagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }
}
