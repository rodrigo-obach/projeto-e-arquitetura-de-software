import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { appMenu, getAppMenu, MenuItem } from './app-menu'
import { AuthService, User } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menu: MenuItem[] = []
  menuCollapsed: boolean = true
  profileCollapsed: boolean = true
  open: Record<string, boolean> = {}
  user: User | null = null

  constructor(private authService: AuthService) {
    this.authService.userState.subscribe((user) => {
      this.user = user
    })

    this.authService.permissionsState.subscribe((permissions) => {
      this.menu = getAppMenu(permissions)
    })
  }

  isOpen(item: MenuItem) {
    return !!this.open[item.key]
  }

  enterMenu(item: MenuItem) {
    if (item.subMenu?.length) {
      this.open[item.key] = true
    }
  }

  leaveMenu(item: MenuItem) {
    this.open[item.key] = false
  }

  toggleMenu(event: Event) {
    event.stopPropagation()
    event.preventDefault()
    this.menuCollapsed = !this.menuCollapsed
  }

  logout() {
    this.authService.logout()
  }
}
