import { MigrationInterface, QueryRunner } from "typeorm"
import { Grupo, Permissao } from "../entity"
import { GrupoRepository, PermissaoRepository } from "../repository"


const permissoes = [
  new Permissao({ chave: 'usuario:ver', nome: 'Ver usuários' }),
  new Permissao({ chave: 'usuario:editar', nome: 'Editar usuários' }),
  new Permissao({ chave: 'grupo:ver', nome: 'Ver grupos' }),
  new Permissao({ chave: 'grupo:editar', nome: 'Editar grupos' }),
  new Permissao({ chave: 'remessa:ver', nome: 'Ver remessas' }),
  new Permissao({ chave: 'remessa:editar', nome: 'Editar remessas' }),
  new Permissao({ chave: 'pacote:ver', nome: 'Ver pacotes' }),
  new Permissao({ chave: 'pacote:editar', nome: 'Editar pacotes' })
]

const grupos = [new Grupo({ nome: 'Administradores', permissoes })]

export class Permissoes1686246581232 implements MigrationInterface {
  readonly permissaoRepository = new PermissaoRepository()
  readonly grupoRepository = new GrupoRepository()

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.permissaoRepository.salvar(permissoes)
    await this.grupoRepository.salvar(grupos)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
