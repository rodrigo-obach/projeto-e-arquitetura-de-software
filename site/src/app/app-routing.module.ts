import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { appPermissions } from './app-permissions'
import { AuthGuardService } from './guards/auth-guard.service'
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SemAcessoComponent } from './pages/sem-acesso/sem-acesso.component'

import { RemessasComponent } from './pages/remessas/remessas.component'
import { UsuariosComponent } from './pages/usuarios/usuarios.component'
import { PacotesComponent } from './pages/pacotes/pacotes.component'
import { EditarRemessaComponent } from './pages/editar-remessa/editar-remessa.component'
import { EditarPacoteComponent } from './pages/editar-pacote/editar-pacote.component'
import { RotaComponent } from './pages/rota/rota.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [AuthGuardService],
  //   data: { unathenticatedOnly: true }
  // },
  {
    path: 'sem-acesso',
    component: SemAcessoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.usuario.ver }
  },
  {
    path: 'usuarios/:id',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.usuario.editar }
  },
  {
    path: 'pacotes',
    component: PacotesComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.pacote.ver }
  },
  {
    path: 'pacotes/:id',
    component: EditarPacoteComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.pacote.editar }
  },
  {
    path: 'remessas',
    component: RemessasComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.remessa.ver }
  },
  {
    path: 'remessas/:id',
    component: EditarRemessaComponent,
    canActivate: [AuthGuardService],
    data: { permission: appPermissions.remessa.editar }
  },
  {
    path: 'login',
    component: RotaComponent,
    canActivate: [AuthGuardService],
    data: { /*permission: appPermissions.remessa.editar,*/ unathenticatedOnly: true, margin: false }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
