import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { PagedResult } from 'src/app/api/common/page-result'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { appPermissions } from 'src/app/app-permissions';
import { AuthService } from 'src/app/services/auth.service';
import { RemessasClient } from 'src/app/api/remessa/remessa.client';
import { BuscarRemessasResponse } from 'src/app/api/remessa/remessa.types';

@Component({
  selector: 'app-remessas',
  templateUrl: './remessas.component.html',
  styleUrls: ['./remessas.component.scss']
})
export class RemessasComponent implements OnInit {
  faSearch = faSearch
  searchSubject = new Subject<string | undefined>()
  remessas?: PagedResult<BuscarRemessasResponse>
  podeEditar: boolean = false

  constructor(private remessasClient: RemessasClient, authService: AuthService) {
    this.podeEditar = authService.hasPermission(appPermissions.remessa.editar)
  }

  ngOnInit(): void {
    this.carregarRemessas(1)

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((termo) => this.carregarRemessas(1, termo))
  }

  carregarRemessas(page: number, termo?: string) {
    this.remessasClient.buscar(termo ?? '', page - 1, 15).subscribe((response) => {
      this.remessas = response
    })
  }

  buscar(event: Event) {
    const termo = (event.target as HTMLInputElement).value
    this.searchSubject.next(termo?.trim())
  }
}
