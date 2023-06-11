import { Body, Controller, Get, Post, Put, Query, Route, Security } from 'tsoa'
import { FiltroRemessa } from '../../repository'
import { CriarPacoteHandler, CriarPacoteRequest } from '../../app/pacotes/commands/criar-pacote'
import { EditarPacoteHandler, EditarPacoteRequest } from '../../app/pacotes/commands/editar-remessa'
import { BuscarPacotesHandler } from '../../app/pacotes/queries/buscar-pacotes'
import { ObterPacoteHandler } from '../../app/pacotes/queries/obter-pacote'

@Route('api/v1/pacotes')
export class PacoteController extends Controller {
  @Get()
  @Security('*', ['pacote:ver'])
  public buscarPacotes(@Query() termo: string, @Query() filtro: FiltroRemessa, @Query() page: number = 0, @Query() pageSize: number = 15) {
    return new BuscarPacotesHandler().executar(termo, filtro, page, pageSize)
  }

  @Get('{id}')
  @Security('*', ['pacote:ver'])
  public obterPacote(id: number) {
    return new ObterPacoteHandler().executar(id)
  }

  @Post()
  @Security('*', ['pacote:editar'])
  public criarPacote(@Body() request: CriarPacoteRequest) {
    return new CriarPacoteHandler().executar(request)
  }

  @Put('{id}')
  @Security('*', ['pacote:editar'])
  public editarPacote(id: number, @Body() request: Omit<EditarPacoteRequest, 'id'>) {
    return new EditarPacoteHandler().executar({ id, ...request})
  }
}
