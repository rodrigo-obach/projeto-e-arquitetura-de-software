import { GrupoRepository } from '../../../repository/Grupo'
import { Grupo } from '../../../entity/grupo'

export interface DadosGrupo {
  id: number
  nome: string
}

export type ListarGruposResponse = DadosGrupo[]

export class ListarGruposHandler {
  private readonly grupoRepository = new GrupoRepository()

  async executar(): Promise<ListarGruposResponse> {
    const grupos = await this.grupoRepository.listarTodos()
    return this.map(grupos)
  }

  private map(usuarios: Grupo[]): ListarGruposResponse {
    return usuarios.map((u) => ({
      id: u.id,
      nome: u.nome
    }))
  }
}
