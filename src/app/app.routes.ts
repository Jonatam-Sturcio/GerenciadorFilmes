import { Routes } from '@angular/router';
import { ListagemFilmesComponent } from './components/listagem-filmes/listagem-filmes.component';
import { DetalhesFilmeComponent } from './components/detalhes-filme/detalhes-filme.component';
import { BuscaComponent } from './components/busca/busca.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full',
  },
  {
    path: 'filmes',
    component: ListagemFilmesComponent,
  },
  {
    path: 'filmes/:id',
    component: DetalhesFilmeComponent,
  },
  {
    path: 'buscar',
    component: BuscaComponent,
  },
];
