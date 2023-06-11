import { Usuario } from '../../../entity/Usuario'
import { UsuarioRepository } from '../../../repository/Usuario'
import { PagedResult } from '../../../common/paged-result'

export interface DadosUsuario {
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

export interface ListarUsuariosResponse extends PagedResult<DadosUsuario[]> {}

export class ListarUsuariosHandler {
  private readonly usuarioRepository = new UsuarioRepository()

  async executar(termo: string, page: number, pageSize): Promise<ListarUsuariosResponse> {
    const result = await this.usuarioRepository.buscar(termo, page, pageSize)
    return {
      data: this.map(result.data),
      pagination: result.pagination
    }
  }

  private map(usuarios: Usuario[]): DadosUsuario[] {
    return usuarios.map((u) => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      ativo: u.ativo,
      provedor: u.idProvedor,
      grupo: {
        id: u.grupo.id,
        nome: u.grupo.nome
      }
    }))
  }
}
