import { PagedResult } from '../../../common/paged-result'
import { Pacote } from '../../../entity'
import { FiltroRemessa, PacoteRepository } from '../../../repository'

export interface DadosPacote {
  id: number
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  idRemessa: number | null
}

export interface BuscarPacoteResponse extends PagedResult<DadosPacote[]> {}

export class BuscarPacotesHandler {
  private readonly pacoteRepository = new PacoteRepository()

  async executar(termo: string, filtro: FiltroRemessa, page: number, pageSize): Promise<BuscarPacoteResponse> {
    const result = await this.pacoteRepository.buscar(termo, filtro, page, pageSize)
    return {
      data: this.map(result.data),
      pagination: result.pagination
    }
  }

  private map(pacotes: Pacote[]): DadosPacote[] {
    return pacotes.map((p) => ({
      id: p.id,
      identificador: p.identificador,
      prazoEntrega: p.prazoEntrega,
      destinatario: p.destinatario,
      endereco: p.endereco,
      idRemessa: p.remessa?.id ?? null
    }))
  }
}
