import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px
    }
  `]
})
export class AgregarComponent implements OnInit {

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  constructor( private heroeService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  guardarHeroe(): any {
    if (this.heroe.superhero.trim().length === 0){
      return;
    }

    // IF en este caso funciona para actualizar el Heroe
    // ELSE funciona para agregar un nuevo heroe
    if (this.heroe.id){
      this.heroeService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnackBar('Registro actualizado'));
    } else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroe/editar', heroe.id]);
          this.mostrarSnackBar('¡Agrego un nuevo héroe!');
       });
    }
  }

  eliminarHeroe(): any{

    const dialog = this.dialog.open( ConfirmarComponent , {
      width: '500px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result){
          // tslint:disable-next-line:no-non-null-assertion
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
          });
        }
      }
    );
  }

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, '¡OK!', {
      duration: 2500
    });
  }
}
