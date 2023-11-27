import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeroiService } from 'src/app/core/services/heroi.service';
import { Category, Heroi } from 'src/app/core/types/type';

@Component({
  selector: 'app-criar-heroi',
  templateUrl: './criar-heroi.component.html',
  styleUrls: ['./criar-heroi.component.scss']
})

export class CriarHeroiComponent implements OnInit {

  formulario!: FormGroup;
  titulo: string = "Criar Héroi";
  tituloBotao: string = "Salvar";
  corBotao: string = "success";
  mostrarCheck: boolean = this.data?.tipo == 'editar' ? true : false;

  constructor(
    private service: HeroiService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CriarHeroiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titulo = this.data?.titulo ? this.data?.titulo : "Criar Herói";
    this.tituloBotao = this.data?.tituloBotao ? this.data?.tituloBotao : "Salvar";
    this.corBotao = this.data?.corBotao ? this.data?.corBotao : "success";

    this.formulario = this.formBuilder.group({
      id: [this.data?.heroi?.id],
      name: [this.data?.heroi?.name, Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      description: [this.data?.heroi?.description, Validators.compose([
        Validators.required,
      ])],
      category: [this.data?.heroi?.category?.name, Validators.compose([Validators.required])],
    })
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  criarHeroi() {

    if (this.formulario.valid) {

      let heroiModel: Heroi = new Heroi();
      heroiModel.category = new Category();
      heroiModel.category.name = this.formulario.get('category')?.value;
      heroiModel.category.descripstion = this.formulario.get('category')?.value;
      heroiModel.category.userId = 0;
      heroiModel.description = this.formulario.get('description')?.value;
      heroiModel.userId = 0;
      heroiModel.name = this.formulario.get('name')?.value;

      if (this.data?.tipo == 'editar') {

        heroiModel.id = this.formulario.get('id')?.value;
        this.service.editarHeroi(heroiModel).subscribe({
          next: (value) => {
            this.toastr.success('Editado com Sucesso.', ' Editado!');

          },
          error: (err) => {
            this.toastr.error('Erro ao tentar Editar.', ' Erro!');
          },
        })
      } else {
        this.formulario.removeControl('id');
        this.service.cadastrarHeroi(heroiModel).subscribe({
          next: (value) => {
            this.toastr.success('Adicionado com Sucesso.', ' Adicionado!');
          },
          error: (err) => {
            this.toastr.error('Erro ao tentar Adicionar.', ' Erro!');
          },
        })
      }
      this.cancelar();
    }
  }
}


