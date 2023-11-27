import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HeroiService } from 'src/app/core/services/heroi.service';
import { Heroi } from 'src/app/core/types/type';

@Component({
  selector: 'app-excluir-heroi',
  templateUrl: './excluir-heroi.component.html',
  styleUrls: ['./excluir-heroi.component.scss']
})

export class ExcluirHeroiComponent implements OnInit {   
  
  constructor(
    private Service: HeroiService,   
    public dialog: MatDialog,    
    public dialogRef: MatDialogRef<ExcluirHeroiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroi,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {}

  cancelar(): void {       
    this.dialogRef.close();
  }  

  excluirHeroi() {
    
      this.Service.excluirHeroi(this.data.id).subscribe( {
        next: (value) => {
          this.toastr.success('Excluido com Sucesso.', 'Excluido!' );
                  
        },
        error: (err) => {
          this.toastr.error('Erro ao tentar excluir.', 'Erro!' );
        },
      })      
      this.cancelar();
    }
  }




