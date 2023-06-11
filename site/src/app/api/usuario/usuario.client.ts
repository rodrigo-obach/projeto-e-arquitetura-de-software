import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EditarUsuarioRequest, UsuarioResponse } from './usuario.types'
import { PagedResult } from '../common/page-result'

@Injectable({
  providedIn: 'root'
})
export class UsuarioClient {
  constructor(private httpClient: HttpClient) {}

  public obterPermissoes() {
    return this.httpClient.get<string[]>('api/v1/usuarios/permissoes')
  }

  public buscar(termo: string, page: number, pageSize: number) {
    return this.httpClient.get<PagedResult<UsuarioResponse>>('api/v1/usuarios', { params: { termo, page, pageSize } })
  }

  public obter(id: number) {
    return this.httpClient.get<UsuarioResponse>(`api/v1/usuarios/${id}`)
  }

  public editar(id: number, request: EditarUsuarioRequest) {
    return this.httpClient.patch<void>(`api/v1/usuarios/${id}`, request)
  }
}
