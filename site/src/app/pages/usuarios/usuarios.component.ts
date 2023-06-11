import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { PagedResult } from 'src/app/api/common/page-result'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UsuarioClient } from 'src/app/api/usuario/usuario.client'
import { UsuarioResponse } from 'src/app/api/usuario/usuario.types';
import { appPermissions } from 'src/app/app-permissions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  faSearch = faSearch
  searchSubject = new Subject<string | undefined>()
  usuarios?: PagedResult<UsuarioResponse>
  podeEditar: boolean = false

  constructor(private usuariosClient: UsuarioClient, authService: AuthService) {
    this.podeEditar = authService.hasPermission(appPermissions.usuario.editar)
  }

  ngOnInit(): void {
    this.carregarUsuarios(1)

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((email) => this.carregarUsuarios(1, email))
  }

  carregarUsuarios(page: number, termo?: string) {
    this.usuariosClient.buscar(termo ?? '', page - 1, 15).subscribe((response) => {
      this.usuarios = response
    })
  }

  buscar(event: Event) {
    const termo = (event.target as HTMLInputElement).value
    this.searchSubject.next(termo?.trim())
  }
}
