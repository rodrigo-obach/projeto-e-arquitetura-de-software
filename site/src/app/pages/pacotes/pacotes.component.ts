import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { PagedResult } from 'src/app/api/common/page-result'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { appPermissions } from 'src/app/app-permissions'
import { AuthService } from 'src/app/services/auth.service'
import { PacotesClient } from 'src/app/api/pacote/pacote.client'
import { BuscarPacotesResponse } from 'src/app/api/pacote/pacote.types'

@Component({
  selector: 'app-pacotes',
  templateUrl: './pacotes.component.html',
  styleUrls: ['./pacotes.component.scss']
})
export class PacotesComponent implements OnInit {
  faSearch = faSearch
  searchSubject = new Subject<string | undefined>()
  pacotes?: PagedResult<BuscarPacotesResponse>
  podeEditar: boolean = false

  constructor(private pacotesClient: PacotesClient, authService: AuthService) {
    this.podeEditar = authService.hasPermission(appPermissions.pacote.editar)
  }

  ngOnInit(): void {
    this.carregarPacotes(1)
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((termo) => this.carregarPacotes(1, termo))
  }

  carregarPacotes(page: number, termo?: string) {
    this.pacotesClient.buscar(termo ?? '', 'todos', page - 1, 15).subscribe((response) => {
      this.pacotes = response
    })
  }

  buscar(event: Event) {
    const termo = (event.target as HTMLInputElement).value
    this.searchSubject.next(termo?.trim())
  }
}
