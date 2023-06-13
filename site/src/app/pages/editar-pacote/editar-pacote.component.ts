import { Component, OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, filter, from, map, mergeMap, Observable, OperatorFunction } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import { appRoutes } from 'src/app/app-routes'
import { PacotesClient } from 'src/app/api/pacote/pacote.client'
import { ObterPacoteResponse } from 'src/app/api/pacote/pacote.types'
import { EnderecoClient } from 'src/app/api/endereco/endereco.client'
import { BuscarEnderecoResponse } from 'src/app/api/endereco/endereco.types'

@Component({
  selector: 'app-editar-pacote',
  templateUrl: './editar-pacote.component.html',
  styleUrls: ['./editar-pacote.component.scss']
})
export class EditarPacoteComponent implements OnInit {
  pacote?: ObterPacoteResponse
  form = new FormGroup({
    identificador: new FormControl('', [Validators.required]),
    prazoEntrega: new FormControl<Date | null>(null, [Validators.required]),
    destinatario: new FormControl('', [Validators.required]),
    endereco: new FormControl<BuscarEnderecoResponse | null>(null, [Validators.required]),
    complemento: new FormControl('', [])
  })

  constructor(
    private pacotesClient: PacotesClient,
    private enderecoClient: EnderecoClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id$ = this.route.params.pipe(
      map(({ id }) => parseInt(id, 10)),
      filter((id) => !isNaN(id))
    )

    id$.subscribe((id) => {
      this.pacotesClient.obter(id).subscribe((pacote) => {
        console.log(pacote)

        this.pacote = pacote
        this.form.setValue({
          identificador: pacote.identificador,
          prazoEntrega: pacote.prazoEntrega,
          destinatario: pacote.destinatario,
          endereco: {
            nome: pacote.endereco,
            latitude: pacote.latitude,
            longitude: pacote.longitude
          },
          complemento: pacote.complemento ?? ''
        })
      })
    })
  }

  onSubmit() {
    const request = {
      identificador: this.form.value.identificador!,
      prazoEntrega: this.form.value.prazoEntrega!,
      destinatario: this.form.value.destinatario!,
      endereco: this.form.value.endereco!.nome,
      latitude: this.form.value.endereco!.latitude,
      longitude: this.form.value.endereco!.longitude,
      complemento: this.form.value.complemento ?? null
    }

    const observable = this.pacote
      ? this.pacotesClient.editar(this.pacote.id, request)
      : this.pacotesClient.criar(request).pipe(map(() => {}))

    observable.subscribe(() => {
      this.toastr.success(this.pacote ? 'Pacote editado com sucesso!' : 'Pacote criado com sucesso!')
      this.router.navigate(appRoutes.pacotes)
    })
  }

  buscarEndereco: OperatorFunction<string, readonly BuscarEnderecoResponse[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((endereco) => {
        if (endereco.length < 5) {
          return from([])
        }

        return this.enderecoClient.buscar(endereco)
      })
    )

  obterNomeEndereco(endereco: BuscarEnderecoResponse) {
    return endereco.nome
  }
}
