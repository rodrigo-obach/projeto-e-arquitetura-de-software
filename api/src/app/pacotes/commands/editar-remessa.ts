import { AppError } from '../../../common/app-error'
import { PacoteRepository } from '../../../repository'

export interface EditarPacoteRequest {
  id: number
  identificador: string
  prazoEntrega: Date
  destinatario: string
  endereco: string
  complemento: string
  latitude: number
  longitude: number
}

export class EditarPacoteHandler {
  private readonly pacoteRepository = new PacoteRepository()

  async executar(request: EditarPacoteRequest): Promise<void> {
    const pacote = await this.pacoteRepository.obter(request.id)

    if (!pacote) {
      throw new AppError('Pacote não encontrado.')
    }

    pacote.identificador = request.identificador
    pacote.prazoEntrega = request.prazoEntrega
    pacote.destinatario = request.destinatario
    pacote.endereco = request.endereco
    pacote.complemento = request.complemento
    pacote.latitude = request.latitude
    pacote.longitude = request.longitude

    await this.pacoteRepository.salvar(pacote)
  }
}
