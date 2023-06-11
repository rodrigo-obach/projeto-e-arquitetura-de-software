import { Controller, Get, Query, Route, Security } from 'tsoa'
import { BuscarEnderecoHandler } from '../../app/enderecos/queries/buscar-endereco'

@Route('api/v1/enderecos')
export class EnderecoController extends Controller {
  @Get('buscar')
  @Security('*')
  public buscarEndereco(@Query() endereco: string) {
    return new BuscarEnderecoHandler().executar(endereco)
  }
}
