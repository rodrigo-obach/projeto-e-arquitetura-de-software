import { Body, Controller, Get, Post, Put, Query, Route, Security } from 'tsoa'
import { CriarRemessaHandler, CriarRemessaRequest } from '../../app/remessas/commands/criar-remessa'
import { EditarRemessaHandler, EditarRemessaRequest } from '../../app/remessas/commands/editar-remessa'
import { BuscarRemessasHandler } from '../../app/remessas/queries/buscar-remessas'
import { ObterRotaRemesaHandler } from '../../app/remessas/queries/buscar-remessas copy'
import { ObterRemessaHandler } from '../../app/remessas/queries/obter-remessa'

@Route('api/v1/remessas')
export class RemessaController extends Controller {
  @Get()
  @Security('*', ['remessa:ver'])
  public buscarRemessas(@Query() page: number = 0, @Query() pageSize: number = 15) {
    return new BuscarRemessasHandler().executar(page, pageSize)
  }

  @Get('{id}')
  @Security('*', ['remessa:ver'])
  public obterRemessa(id: number) {
    return new ObterRemessaHandler().executar(id)
  }

  @Post()
  @Security('*', ['remessa:editar'])
  public criarRemessa(@Body() request: CriarRemessaRequest) {
    return new CriarRemessaHandler().executar(request)
  }

  @Put('{id}')
  @Security('*', ['remessa:editar'])
  public editarRemessa(id: number, @Body() request: Omit<EditarRemessaRequest, 'id'>) {
    return new EditarRemessaHandler().executar({ id, ...request })
  }

  @Get('{id}/rota')
  @Security('*', ['remessa:ver'])
  public obterRota(id: number) {
    return new ObterRotaRemesaHandler().executar(id)
  }
}
