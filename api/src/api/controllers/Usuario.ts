import { Body, Controller, Get, Patch, Query, Request, Route, Security } from 'tsoa'
import Express from 'express'
import { ObterUsuarioHandler } from '../../app/usuarios/queries/obter-usuario'
import { ListarUsuariosHandler } from '../../app/usuarios/queries/listar-usuarios'
import { EditarUsuarioCommand, EditarUsuarioHandler } from '../../app/usuarios/commands/editar-usuario'
import { compareAsc } from 'date-fns'

@Route('api/v1/usuarios')
export class UsuarioController extends Controller {
  @Get('permissoes')
  @Security('*')
  public obterPermissoes(@Request() request: Express.Request): string[] {
    return [...request.user.permissions]
  }

  @Get()
  @Security('*', ['usuario:ver'])
  public buscarUsuarios(@Query() termo: string, @Query() page: number = 0, @Query() pageSize: number = 15) {
    return new ListarUsuariosHandler().executar(termo, page || 0, pageSize || 15)
  }

  @Get('{id}')
  @Security('*', ['usuario:ver'])
  public obterUsuario(id: number) {
    return new ObterUsuarioHandler().executar(id)
  }

  @Patch('{id}')
  @Security('*', ['usuario:editar'])
  public editarUsuario(id: number, @Body() command: Omit<EditarUsuarioCommand, 'id'>) {
    return new EditarUsuarioHandler().executar({ id, ...command })
  }
}
