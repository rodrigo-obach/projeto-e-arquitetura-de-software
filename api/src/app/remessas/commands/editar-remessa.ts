import { AppError } from '../../../common/app-error'
import { Pacote } from '../../../entity'
import { RemessaRepository } from '../../../repository'

export interface EditarRemessaRequest {
  id: number
  descricao: string
  data: Date
  pacotes: number[]
}

export class EditarRemessaHandler {
  private readonly remessaRepository = new RemessaRepository()

  async executar(request: EditarRemessaRequest): Promise<void> {
    const remessa = await this.remessaRepository.obter(request.id)

    if (!remessa) {
      throw new AppError('Remessa não encontrado.')
    }

    remessa.descricao = request.descricao,
    remessa.data = request.data,
    remessa.pacotes = request.pacotes?.map(id => new Pacote({ id })) ?? [],
    await this.remessaRepository.salvar(remessa)
  }
}
