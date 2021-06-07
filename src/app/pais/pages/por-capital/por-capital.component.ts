import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = 'hi';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(event:string) {
    this.termino = event;
    this.hayError = false;
    this.paisService.buscarCapital(this.termino)
      .subscribe(paises => {
        this.paises = paises;
      },
        err => {
          this.hayError = true;
          this.paises = [];
        });
  }

}
