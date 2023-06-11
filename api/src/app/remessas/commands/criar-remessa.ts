import { Pacote, Remessa } from '../../../entity'
import { RemessaRepository } from '../../../repository'

export interface CriarRemessaRequest {
  descricao: string
  data: Date
  pacotes: number[]
}

export interface CriarRemessaResponse {
  id: number
}

export class CriarRemessaHandler {
  private readonly remessaRepository = new RemessaRepository()

  async executar(request: CriarRemessaRequest): Promise<CriarRemessaResponse> {
    const remessa = new Remessa({
      descricao: request.descricao,
      data: request.data,
      pacotes: request.pacotes?.map((id) => new Pacote({ id })) ?? []
    })

    await this.remessaRepository.salvar(remessa)
    return { id: remessa.id }
  }
}
