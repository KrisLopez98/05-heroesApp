import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogref: MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe) { }
  // @Inject funciona para leer la data que viene desde el componente padre

  ngOnInit(): void {
  }

  borrar(): void{
    this.dialogref.close(true);
  }

  cerrar(): void{
    this.dialogref.close();
  }

}
