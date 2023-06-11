import { Component, OnInit } from '@angular/core'
import { combineLatestWith, map } from 'rxjs'
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


@Component({
  selector: 'app-editar-remessa',
  templateUrl: './editar-remessa.component.html',
  styleUrls: ['./editar-remessa.component.scss']
})
export class EditarRemessaComponent implements OnInit {
  pacotes?: BuscarPacotesResponse[]
  remessa?: ObterRemessaResponse
  form = new FormGroup({
    grupo: new FormControl(0, [Validators.required]),
     ativo: new FormControl(false, [])
  })

  constructor(
    private remessasClient: RemessasClient,
    private pacotesClient: PacotesClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const id$ = this.route.params.pipe(map(({ id }) => parseInt(id, 10)))
    // const grupos$ = this.grupoClient.obterTodos()

    // id$.pipe(combineLatestWith(grupos$)).subscribe(([id, grupos]) => {
    //   this.grupos = grupos
    //   this.usuarioClient.obter(id).subscribe((usuario) => {
    //     this.usuario = usuario
    //     this.form.setValue({
    //       grupo: usuario.grupo.id,
    //       ativo: usuario.ativo
    //     })
    //   })
    // })
  }

  onSubmit() {
    // this.usuarioClient
    //   .editar(this.usuario!.id, {
    //     ativo: this.form.value.ativo!,
    //     idGrupo: this.form.value.grupo!
    //   })
    //   .subscribe(() => {
    //     this.toastr.success(`Usuário editado com sucesso!`)
    //     this.router.navigate(appRoutes.usuarios)
    //   })
  }
}
