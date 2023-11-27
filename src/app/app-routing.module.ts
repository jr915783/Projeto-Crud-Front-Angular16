import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';
import { ListaHeroiComponent } from './pages/heroi/lista-heroi/lista-heroi.component';

const routes: Routes = [
  {
    path: '',
    component: ListaHeroiComponent,
    canActivate: [authGuard]
  },  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'lista-heroi',
    component: ListaHeroiComponent ,
    canActivate: [authGuard]   
  },
  { path: '**', 
  component: ListaHeroiComponent,
  canActivate: [authGuard]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
