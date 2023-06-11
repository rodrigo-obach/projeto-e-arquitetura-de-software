import { UsuarioRepository } from '../../../repository/Usuario'

export interface ObterUsuarioResponse {
  id: number
  nome: string
  email: string
  ativo: boolean
  provedor: string
  grupo: {
    id: number
    nome: string
  }
}

export class ObterUsuarioHandler {
  private readonly usuarioRepository = new UsuarioRepository()

  async executar(id: number): Promise<ObterUsuarioResponse | undefined> {
    const usuario = await this.usuarioRepository.obter(id)

    if (!usuario) {
      return undefined
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      ativo: usuario.ativo,
      provedor: usuario.idProvedor,
      grupo: {
        id: usuario.grupo.id,
        nome: usuario.grupo.nome
      }
    }
  }
}
