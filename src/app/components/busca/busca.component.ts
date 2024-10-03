import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ResultadoBuscaFilme } from '../../models/resultado-busca-filme.models';
import { ListagemFilme } from '../../models/listagem-filme.models';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BarraBuscaComponent } from '../barra-busca/barra-busca.component';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink, NgClass, BarraBuscaComponent],
  templateUrl: './busca.component.html',
})
export class BuscaComponent {
  public resultadoBusca?: ResultadoBuscaFilme;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService
  ) {
    route.queryParams.subscribe((params) => {
      this.buscar(params['query']);
    });
  }

  public buscar(query: string, pagina: number = 1) {
    if (query.length < 1) return;

    this.filmeService.buscarFilmes(query).subscribe((res) => {
      const novoResultado = this.mapearResultadoBuca(res);

      this.resultadoBusca = novoResultado;
    });
  }

  public mapearCorDaNota(porcetagemNota: string): string {
    const numeroNota = Number(porcetagemNota);

    if (numeroNota > 75) return 'app-borda-nota-alta';
    else if (numeroNota > 50) return 'app-borda-nota-media';
    else if (numeroNota > 30) return 'app-borda-nota-baixa';
    else return 'app-borda-nota-mais-baixa';
  }

  private mapearResultadoBuca(obj: any): ResultadoBuscaFilme {
    return {
      pagina: obj.page,
      quantidadePaginas: obj.total_pages,
      quantidadeResultados: obj.total_results,
      filmes: obj.results.map(this.mapearListagemFilme),
    };
  }

  private mapearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }
}
