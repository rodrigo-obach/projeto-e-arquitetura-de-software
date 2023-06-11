import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppUserIcon } from './components/ui/user-icon/user-icon.component'
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { AuthService } from './services/auth.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptorService } from './interceptors/token-interceptor.service'
import { AuthGuardService } from './guards/auth-guard.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component'
import { SemAcessoComponent } from './pages/sem-acesso/sem-acesso.component'
import { ModalDialogModule } from 'ngx-modal-dialog'
import { environment } from 'src/environments/environment'
import { UsuariosComponent } from './pages/usuarios/usuarios.component'
import { RemessasComponent } from './pages/remessas/remessas.component'
import { EditarRemessaComponent } from './pages/editar-remessa/editar-remessa.component'
import { PacotesComponent } from './pages/pacotes/pacotes.component'
import { EditarPacoteComponent } from './pages/editar-pacote/editar-pacote.component'

@NgModule({
  declarations: [
    AppComponent,
    AppUserIcon,
    LoginComponent,
    SemAcessoComponent,
    HomeComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    PacotesComponent,
    EditarPacoteComponent,
    RemessasComponent,
    EditarRemessaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SocialLoginModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleSigninButtonModule,
    //ModalDialogModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleLogin.clientId, { oneTapEnabled: true })
          }
        ],
        onError: (err) => {
          console.error('Login error', err)
        }
      } as SocialAuthServiceConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
