import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PagedResult } from '../common/page-result'
import { GrupoResponse } from './grupo.types'

@Injectable({
  providedIn: 'root'
})
export class GrupoClient {
  constructor(private httpClient: HttpClient) {}

  public obterTodos() {
    return this.httpClient.get<GrupoResponse[]>('api/v1/grupos')
  }
}
