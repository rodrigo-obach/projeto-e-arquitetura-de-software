import { PacoteRepository } from "../../../repository"

export interface ObterPacoteResponse {
  id: number
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  latitude: number
  longitude: number
  idRemessa: number | null
}

export class ObterPacoteHandler {
  private readonly pacoteRepository = new PacoteRepository()

  async executar(id: number): Promise<ObterPacoteResponse | undefined> {
    const pacote = await this.pacoteRepository.obter(id)

    if (!pacote) {
      return undefined
    }

    return {
      id: pacote.id,
      identificador: pacote.identificador,
      prazoEntrega: pacote.prazoEntrega,
      destinatario: pacote.destinatario,
      endereco: pacote.endereco,
      latitude: pacote.latitude,
      longitude: pacote.longitude,
      idRemessa: pacote.remessa?.id ?? null
    }
  }
}
