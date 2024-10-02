import { VideoFilme } from './filme-video.models';
import { GeneroFilme } from './genero-filme.models';
import { MembroCreditos } from './membro-creditos.models';

export interface DetalhesFilme {
  id: number;
  titulo: string;
  sinopse: string;
  lancamento: string;
  porcentagemNota: string;
  urlPoster: string;
  urlFundo: string;
  generos: GeneroFilme[];
  videos: VideoFilme[];
  elencoPrincipal: MembroCreditos[];
}
