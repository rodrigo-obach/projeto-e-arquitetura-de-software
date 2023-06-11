import { PagedResult } from '../../../common/paged-result'
import { RemessaRepository } from '../../../repository'
import { Remessa } from '../../../entity'

export interface DadosRemessa {
  id: number
  descricao: string
  data: Date
}

export interface BuscarRemessasResponse extends PagedResult<DadosRemessa[]> {}

export class BuscarRemessasHandler {
  private readonly remessasRepository = new RemessaRepository()

  async executar(page: number, pageSize): Promise<BuscarRemessasResponse> {
    const result = await this.remessasRepository.buscar(page, pageSize)
    return {
      data: this.map(result.data),
      pagination: result.pagination
    }
  }

  private map(remessas: Remessa[]): DadosRemessa[] {
    return remessas.map((c) => ({
      id: c.id,
      descricao: c.descricao,
      data: c.data,
    }))
  }
}
