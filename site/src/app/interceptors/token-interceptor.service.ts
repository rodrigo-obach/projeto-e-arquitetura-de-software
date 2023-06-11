import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { catchError, Observable, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      })
    }

    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case 400:
            this.toastr.warning(error.error?.message ?? '', 'Requisição inválida')
            break

          case 401:
            this.toastr.warning('Você será redirecionado para página de login.', 'Sessão expirada')
            this.authService.logout()
            break

          case 401:
            this.toastr.warning('Você não possui permissão para executar está ação.', 'Acesso negado')
            this.authService.logout()
            break

          default:
            this.toastr.error(error.error?.message ?? '', 'Ocorreu um erro')
            break
        }

        return throwError(() => error)
      })
    )
  }
}
