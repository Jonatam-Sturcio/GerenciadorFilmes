import { GeneroFilme } from './genero-filme.models';

export interface DetalhesFilme {
  id: number;
  titulo: string;
  sinopse: string;
  lancamento: string;
  porcentagemNota: string;
  urlPoster: string;
  urlFundo: string;
  generos: GeneroFilme[];
}
