import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  BuscarRemessasResponse,
  CriarOuEditarRemessaRequest,
  CriarRemessaResponse,
  ObterRemessaResponse
} from './remessa.types'
import { PagedResult } from '../common/page-result'

@Injectable({
  providedIn: 'root'
})
export class RemessasClient {
  constructor(private httpClient: HttpClient) {}

  public buscar(termo: string, page: number, pageSize: number) {
    return this.httpClient.get<PagedResult<BuscarRemessasResponse>>('api/v1/remessas', {
      params: { termo, page, pageSize }
    })
  }

  public obter(id: number) {
    return this.httpClient.get<ObterRemessaResponse>(`api/v1/remessas/${id}`)
  }

  public criar(request: CriarOuEditarRemessaRequest) {
    return this.httpClient.post<CriarRemessaResponse>('api/v1/remessas', request)
  }

  public editar(id: number, request: CriarOuEditarRemessaRequest) {
    return this.httpClient.patch<void>(`api/v1/remessas/${id}`, request)
  }
}
