import { Controller, Get, Route, Security } from 'tsoa'
import { ListarGruposHandler } from '../../app/grupos/queries/listar-grupos'

@Route('api/v1/grupos')
export class GrupoController extends Controller {
  @Get()
  @Security('*', ['grupo:ver'])
  public listarGrupos() {
    return new ListarGruposHandler().executar()
  }
}
