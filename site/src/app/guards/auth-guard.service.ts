import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { appRoutes } from '../app-routes'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAuthentication = !route.data['unathenticatedOnly']
    if (this.authService.isAuthenticated !== requiresAuthentication) {
      const route = this.authService.isAuthenticated ? appRoutes.home : appRoutes.login
      this.router.navigate(route)
      return false
    }

    const requiredPermission = typeof route.data['permission'] === 'string' ? route.data['permission'] : null
    if (requiredPermission && !this.authService.hasPermission(requiredPermission)) {
      this.router.navigate(appRoutes.home)
      return false
    }

    return true
  }
}
