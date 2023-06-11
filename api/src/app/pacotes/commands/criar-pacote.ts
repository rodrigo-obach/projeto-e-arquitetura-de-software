import { Pacote } from '../../../entity'
import { PacoteRepository } from '../../../repository'

export interface CriarPacoteRequest {
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  complemento: string
  latitude: number
  longitude: number
}

export interface CriarPacoteResponse {
  id: number
}

export class CriarPacoteHandler {
  private readonly pacoteRepository = new PacoteRepository()

  async executar(request: CriarPacoteRequest): Promise<CriarPacoteResponse> {
    const pacote = new Pacote(request)
    await this.pacoteRepository.salvar(pacote)
    return { id: pacote.id }
  }
}
