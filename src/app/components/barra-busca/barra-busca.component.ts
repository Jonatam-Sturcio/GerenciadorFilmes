import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barra-busca',
  standalone: true,
  imports: [],
  templateUrl: './barra-busca.component.html',
  styleUrl: './barra-busca.component.scss',
})
export class BarraBuscaComponent {
  constructor(private router: Router, private toastrService: ToastrService) {}

  public buscar(query: string) {
    if (query.length < 1) {
      this.toastrService.warning(
        'Digite algo na barra de busca antes de pesquisar!',
        'Aviso'
      );
      return;
    }

    this.router.navigate(['/buscar'], {
      queryParams: {
        query: query,
      },
    });
  }
}
