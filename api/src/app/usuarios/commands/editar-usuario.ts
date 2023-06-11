import { randomUUID } from 'crypto'
import { addDays } from 'date-fns'
import { AppError } from '../../../common/app-error'
import { getConfigSection } from '../../../config'
import { sendEmail } from '../../../email/email'
import { Convite } from '../../../entity/convite'
import { ConviteRepository } from '../../../repository/Convite'
import { GrupoRepository } from '../../../repository/Grupo'
import { UsuarioRepository } from '../../../repository/Usuario'

export interface EditarUsuarioCommand {
  id: number
  ativo: boolean
  idGrupo: number
}

export class EditarUsuarioHandler {
  private readonly grupoRepository = new GrupoRepository()
  private readonly usuarioRepository = new UsuarioRepository()

  async executar({ id, ativo, idGrupo }: EditarUsuarioCommand) {
    const usuario = await this.usuarioRepository.obter(id)
    if (!usuario) {
      throw new AppError('Usuário não encontrado')
    }

    const grupo = await this.grupoRepository.obter(idGrupo)
    if (!grupo) {
      throw new AppError('Grupo não encontrado')
    }

    usuario.grupo = grupo
    usuario.ativo = ativo
    await this.usuarioRepository.salvar(usuario)
  }
}
