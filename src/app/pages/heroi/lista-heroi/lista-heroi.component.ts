import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Heroi, Pagination } from 'src/app/core/types/type';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { HeroiService } from 'src/app/core/services/heroi.service';
import { ExcluirHeroiComponent } from '../excluir-heroi/excluir-heroi.component';
import { CriarHeroiComponent } from '../criar-heroi/criar-heroi.component';
import { DetalheHeroiComponent } from '../detalhe-heroi/detalhe-heroi.component';



@Component({
  selector: 'app-lista-Heroi',
  templateUrl: './lista-Heroi.component.html',
  styleUrls: ['./lista-Heroi.component.scss']
})
export class ListaHeroiComponent implements OnInit {

  title: string = "Lista de Herois";
  listaHerois: Heroi[] = [];
  paginaAtual: number = 1;
  haMaisFavoritos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;
  listaFavoritos: Heroi[] = []
  titulo: string = 'Meu Mural';
  filtroGrid: string = "";
  dadosLista: string = "Não existe dados a serem exibidos";
  filtroNaoEncotrado: boolean = false;
  pagination = {} as Pagination;
  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private service: HeroiService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.pagination = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 1,
    } as Pagination;

    this.listarHerois();
    this.verificarLista();
  }

  verificarLista() {
    this.listaHerois.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
  }

  abrirModalCriarHeroi(): void {
    const dialogRef = this.dialog.open(CriarHeroiComponent, {
      width: '650px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarHerois();
    });
  }

  abrirModalExcluirHeroi(Heroi: Heroi): void {
    const dialogRef = this.dialog.open(ExcluirHeroiComponent, {
      width: '500px',
      height: '240px',
      data: Heroi
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarHerois();
    });
  }

  abrirModalDetalheHeroi(heroi: Heroi): void {
    const dialogRef = this.dialog.open(DetalheHeroiComponent, {
      width: '600px',
      height: '350px',
      data: heroi
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarHerois();
    });
  }

  listarHerois() {
    this.service.listarHeroi().subscribe(() => {
      this.verificarLista();
    })

    this.service
      .listarHeroi(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (paginatedResult: any) => {
          this.listaHerois = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
          this.listaHerois.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
        },
        (error: any) => {}
      )}

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.listarHerois();
  }


  filtrarGrid(evt: any) { 

    if (this.termoBuscaChanged.observers.length === 0) {     
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {          
          this.service
            .listarHeroi(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: any) => {
                this.listaHerois = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
                this.listaHerois.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
              },
              (error: any) => {               
                this.toastr.error('Erro ao Carregar os Herois', 'Erro!');
              }
            )            
        });       
    }
    this.termoBuscaChanged.next(evt.value);
  }

  abrirModalEditarHeroi(heroi: Heroi): void {
    const dialogRef = this.dialog.open(CriarHeroiComponent, {
      width: '650px',
      height: '420px',
      data: {
        heroi,
        tipo: 'editar',
        titulo: 'Editar Herói',
        tituloBotao: 'Salvar',
        corBotao: 'success'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarHerois();
    });
  }

  alterStatusHeroi(Heroi : Heroi){
    
    this.service.editarHeroi(Heroi).subscribe({
      next: (value) => {
        this.toastr.success('Editado com Sucesso.', ' Editado!' );
        this.listarHerois();
      },
      error: (err) => {           
        this.toastr.error('Erro ao tentar Editar.', ' Erro!' );
      },     
    })    
  }
}


