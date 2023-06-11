import { RemessaRepository } from "../../../repository"

export interface ObterRemessaResponse {
  id: number
  descricao: string
  data: Date
  pacotes: number[]
}

export class ObterRemessaHandler {
  private readonly remessaRepository = new RemessaRepository()

  async executar(id: number): Promise<ObterRemessaResponse | undefined> {
    const remessa = await this.remessaRepository.obter(id)

    if (!remessa) {
      return undefined
    }

    return {
      id: remessa.id,
      descricao: remessa.descricao,
      data: remessa.data,
      pacotes: remessa?.pacotes.map(p => p.id) ?? []
    }
  }
}
