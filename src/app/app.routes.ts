import { Routes } from '@angular/router';
import { ListagemFilmesComponent } from './components/listagem-filmes/listagem-filmes.component';
import { DetalhesFilmeComponent } from './components/detalhes-filme/detalhes-filme.component';

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
];
