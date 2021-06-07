import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    // Dos formas de encadenar subscribes (cuando el segundo depende del primero)
    // 1) Simplemente incluyendo el segundo subscribe dentro del primero
    // this.activatedRoute.params
    //   .subscribe( ({id}) => {

    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe( pais => {
    //         console.log(pais);
    //       });

    //   });

    // 2) Utilizando el operador switchMap de rxjs, el cual cambia el dato devuelto por el flujo
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log) // Forma corta de imprimir por consola
      )
      .subscribe( pais => {
        this.pais = pais;
      });
    
  }

}
