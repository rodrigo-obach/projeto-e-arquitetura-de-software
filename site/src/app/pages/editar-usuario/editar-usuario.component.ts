import { Component, OnInit } from '@angular/core'
import { combineLatestWith, map } from 'rxjs'
import { GrupoResponse } from 'src/app/api/grupo/grupo.types'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { GrupoClient } from 'src/app/api/grupo/grupo.client'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import { appRoutes } from 'src/app/app-routes'
import { UsuarioResponse } from 'src/app/api/usuario/usuario.types'
import { UsuarioClient } from 'src/app/api/usuario/usuario.client'

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  grupos?: GrupoResponse[]
  usuario?: UsuarioResponse
  form = new FormGroup({
    grupo: new FormControl(0, [Validators.required]),
    ativo: new FormControl(false, [])
  })

  constructor(
    private grupoClient: GrupoClient,
    private usuarioClient: UsuarioClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id$ = this.route.params.pipe(map(({ id }) => parseInt(id, 10)))
    const grupos$ = this.grupoClient.obterTodos()

    id$.pipe(combineLatestWith(grupos$)).subscribe(([id, grupos]) => {
      this.grupos = grupos
      this.usuarioClient.obter(id).subscribe((usuario) => {
        this.usuario = usuario
        this.form.setValue({
          grupo: usuario.grupo.id,
          ativo: usuario.ativo
        })
      })
    })
  }

  onSubmit() {
    this.usuarioClient
      .editar(this.usuario!.id, {
        ativo: this.form.value.ativo!,
        idGrupo: this.form.value.grupo!
      })
      .subscribe(() => {
        this.toastr.success(`Usuário editado com sucesso!`)
        this.router.navigate(appRoutes.usuarios)
      })
  }
}
