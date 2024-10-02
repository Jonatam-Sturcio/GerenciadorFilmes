import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { DetalhesFilme } from '../../models/detalhes-filme.models';
import { GeneroFilme } from '../../models/genero-filme.models';
import { VideoFilme } from '../../models/filme-video.models';
import { DomSanitizer } from '@angular/platform-browser';
import { MembroCreditos } from '../../models/membro-creditos.models';

@Component({
  selector: 'app-detalhes-filme',
  standalone: true,
  imports: [NgIf, NgClass, NgForOf],
  templateUrl: './detalhes-filme.component.html',
  styleUrl: './detalhes-filme.component.scss',
})
export class DetalhesFilmeComponent implements OnInit {
  public detalhes?: DetalhesFilme;
  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private domSanitazer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      throw new Error(
        'Não foi possível obter informações sobre o filme requisitado.'
      );
    }
    this.filmeService.selecionarDetalhesFilmePorId(id).subscribe((f) => {
      this.detalhes = this.mapearDetalhesFilme(f);
    });
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);
    if (numeroNota > 75) return 'app-borda-nota-alta';
    else if (numeroNota > 50) return 'app-borda-nota-media';
    else if (numeroNota > 30) return 'app-borda-nota-baixa';
    else return 'app-borda-nota-mais-baixa';
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      sinopse: obj.overview,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
      urlPoster: 'https://image.tmdb.org/t/p/w300' + obj.poster_path,
      urlFundo: 'https://image.tmdb.org/t/p/original' + obj.backdrop_path,
      generos: obj.genres
        .map(this.mapearGeneroFilme)
        .map((g: GeneroFilme) => g.nome)
        .join(', '),

      videos: obj.videos.results.map((v: any) => this.mapearVideoFilme(v)),

      elencoPrincipal: obj.credits.cast.map(this.mapearElencoFilme),
    };
  }

  private mapearGeneroFilme(obj: any): GeneroFilme {
    return {
      id: obj.id,
      nome: obj.name,
    };
  }
  private mapearVideoFilme(obj: any): VideoFilme {
    return {
      id: obj.id,
      sourceUrl: this.domSanitazer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + obj.key
      ),
    };
  }

  private mapearElencoFilme(obj: any): MembroCreditos {
    return {
      id: obj.id,
      nome: obj.name,
      papel: obj.character,
      urlImagem: 'https://image.tmdb.org/t/p/w300' + obj.profile_path,
    };
  }
}
