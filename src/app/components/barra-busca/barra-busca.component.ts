import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busca',
  standalone: true,
  imports: [],
  templateUrl: './barra-busca.component.html',
  styleUrl: './barra-busca.component.scss',
})
export class BarraBuscaComponent {
  constructor(private router: Router) {}

  public buscar(query: string) {
    if (query.length < 1) return;

    this.router.navigate(['/buscar'], {
      queryParams: {
        query: query,
      },
    });
  }
}
