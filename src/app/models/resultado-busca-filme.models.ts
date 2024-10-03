import { ListagemFilme } from './listagem-filme.models';

export interface ResultadoBuscaFilme {
  filmes: ListagemFilme[];
  pagina: number;
  quantidadePaginas: number;
  quantidadeResultados: number;
}
