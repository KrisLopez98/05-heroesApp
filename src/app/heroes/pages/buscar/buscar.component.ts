import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino = '';
  public heroes: Heroe[] = [];

  public heroeSeleccionado!: Heroe | undefined;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroeService.getSugerencias( this.termino.trim() )
    .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): any{

    if (!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    // tslint:disable-next-line:no-non-null-assertion
    this.heroeService.getHeroePorId( heroe.id! )
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe( heroe => this.heroeSeleccionado = heroe);

  }

}
