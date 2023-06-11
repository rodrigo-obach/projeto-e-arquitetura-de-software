import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { EventEmitter, Injectable, Output } from '@angular/core'
import { Router } from '@angular/router'
import { UsuarioClient } from '../api/usuario/usuario.client'
import { appRoutes } from '../app-routes'

export interface User {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user?: SocialUser

  private permissions?: Set<string>

  @Output()
  public readonly userState = new EventEmitter<User>()

  @Output()
  public readonly permissionsState = new EventEmitter<Set<string>>()

  constructor(private authService: SocialAuthService, private router: Router, private usuarioClient: UsuarioClient) {
    this.authService.authState.subscribe((user) => {
      this.user = user
      this.userState.emit(this.user)

      const route = user ? appRoutes.home : appRoutes.login
      this.router.navigate(route)

      if (user) {
        this.loadPermissions()
      }
    })
  }

  get isAuthenticated() {
    return !!this.user
  }

  get token() {
    return this.user?.idToken
  }

  hasPermission(permission: string) {
    return this.permissions?.has(permission) ?? false
  }

  logout() {
    this.authService.signOut()
  }

  private loadPermissions() {
    this.usuarioClient.obterPermissoes().subscribe((response) => {
      this.permissions = new Set<string>(response ?? [])
      this.permissionsState.emit(this.permissions)

      if (!this.permissions?.size) {
        this.router.navigate(appRoutes.semAcesso)
      }
    })
  }
}
