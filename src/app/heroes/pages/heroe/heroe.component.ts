import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interface/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px
    }
  `]
})
export class HeroeComponent implements OnInit {
  [x: string]: any;

  heroe!: Heroe;

  constructor( private route: ActivatedRoute, private heroesServicio: HeroesService, private router: Router) { }

  ngOnInit(): void {
   this.route.params
   .pipe(
     switchMap( ({id}) => this.heroesServicio.getHeroePorId(id) )
   ).subscribe( heroe => this.heroe = heroe);
  }

  public regresarListado(): void{
    this.router.navigate(['heroes/listado']);
  }


}
