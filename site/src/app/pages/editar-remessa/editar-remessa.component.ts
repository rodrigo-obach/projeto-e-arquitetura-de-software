import { Component, OnInit } from '@angular/core'
import { combineLatestWith, debounceTime, distinctUntilChanged, filter, map, Subject } from 'rxjs'
import { GrupoResponse } from 'src/app/api/grupo/grupo.types'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { GrupoClient } from 'src/app/api/grupo/grupo.client'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import { appRoutes } from 'src/app/app-routes'
import { ObterRemessaResponse } from 'src/app/api/remessa/remessa.types'
import { RemessasClient } from 'src/app/api/remessa/remessa.client'
import { PacotesClient } from 'src/app/api/pacote/pacote.client'
import { BuscarPacotesResponse } from 'src/app/api/pacote/pacote.types'
import { PagedResult } from 'src/app/api/common/page-result'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-editar-remessa',
  templateUrl: './editar-remessa.component.html',
  styleUrls: ['./editar-remessa.component.scss']
})
export class EditarRemessaComponent implements OnInit {
  faSearch = faSearch
  searchSubject = new Subject<string | undefined>()
  pacotes?: PagedResult<BuscarPacotesResponse>
  remessa?: ObterRemessaResponse
  form = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    data: new FormControl<Date | null>(null, []),
    pacotes: new FormControl(new Set<number>(), [])
  })

  constructor(
    private remessasClient: RemessasClient,
    private pacotesClient: PacotesClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPacotes(1)

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((termo) => this.carregarPacotes(1, termo))

    this.route.params
      .pipe(
        map(({ id }) => parseInt(id, 10)),
        filter((id) => !isNaN(id))
      )
      .subscribe((id) => {
        this.remessasClient.obter(id).subscribe((remessa) => {
          this.remessa = remessa
          this.form.setValue({
            descricao: remessa.descricao,
            data: remessa.data,
            pacotes: new Set<number>(remessa.pacotes)
          })
        })
      })
  }

  carregarPacotes(page: number, termo?: string) {
    this.pacotesClient.buscar(termo ?? '', 'todos', page - 1, 10).subscribe((response) => {
      this.pacotes = response
    })
  }

  buscarPacotes(event: Event) {
    const termo = (event.target as HTMLInputElement).value
    this.searchSubject.next(termo?.trim())
  }

  pacoteSelecionado(idPacote: number) {
    return this.form.value.pacotes?.has(idPacote)
  }

  selecionarPacote(event: any, idPacote: number) {
    if (event.target.checked) {
      this.form.value.pacotes?.add(idPacote)
    } else {
      this.form.value.pacotes?.delete(idPacote)
    }
  }

  onSubmit() {
    const request = {
      descricao: this.form.value.descricao!,
      data: this.form.value.data!,
      pacotes: Array.from(this.form.value.pacotes!)
    }

    const observable = this.remessa
      ? this.remessasClient.editar(this.remessa.id, request)
      : this.remessasClient.criar(request).pipe(map(() => {}))

    observable.subscribe(() => {
      this.toastr.success(this.remessa ? 'Remessa editada com sucesso!' : 'Remessa criada com sucesso!')
      this.router.navigate(appRoutes.remessas)
    })
  }
}
