import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Heroi } from 'src/app/core/types/type';

@Component({
  selector: 'app-detalhe-heroi',
  templateUrl: './detalhe-heroi.component.html',
  styleUrls: ['./detalhe-heroi.component.scss']
})

export class DetalheHeroiComponent implements OnInit {   
  
  constructor(       
    public dialog: MatDialog,    
    public dialogRef: MatDialogRef<DetalheHeroiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroi
  ) { }

  ngOnInit(): void {}

  cancelar(): void {       
    this.dialogRef.close();
  }  

}




