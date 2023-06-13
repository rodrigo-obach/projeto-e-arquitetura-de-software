import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PagedResult } from '../common/page-result'
import { BuscarPacotesResponse, CriarOuEditarPacoteRequest, CriarPacoteResponse, FiltroRemessa, ObterPacoteResponse } from './pacote.types'

@Injectable({
  providedIn: 'root'
})
export class PacotesClient {
  constructor(private httpClient: HttpClient) {}

  public buscar(termo: string, filtro: FiltroRemessa, page: number, pageSize: number) {
    return this.httpClient.get<PagedResult<BuscarPacotesResponse>>('api/v1/pacotes', {
      params: { termo, filtro, page, pageSize }
    })
  }

  public obter(id: number) {
    return this.httpClient.get<ObterPacoteResponse>(`api/v1/pacotes/${id}`)
  }

  public criar(request: CriarOuEditarPacoteRequest) {
    return this.httpClient.post<CriarPacoteResponse>('api/v1/pacotes', request)
  }

  public editar(id: number, request: CriarOuEditarPacoteRequest) {
    return this.httpClient.put<void>(`api/v1/pacotes/${id}`, request)
  }
}
