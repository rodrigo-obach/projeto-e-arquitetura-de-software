import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BuscarEnderecoResponse } from './endereco.types'
import { PagedResult } from '../common/page-result'

@Injectable({
  providedIn: 'root'
})
export class EnderecoClient {
  constructor(private httpClient: HttpClient) {}

  public buscar(endereco: string) {
    return this.httpClient.get<BuscarEnderecoResponse[]>('api/v1/enderecos/buscar', { params: { endereco } })
  }
}
