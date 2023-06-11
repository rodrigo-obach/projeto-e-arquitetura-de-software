import { createPagedResult, PagedResult } from '../common'
import { Provedor, Usuario } from '../entity'
import { BaseRepository } from './BaseRepository'

export class UsuarioRepository extends BaseRepository<Usuario> {
  constructor() {
    super(Usuario)
  }

  public obter(id: number): Promise<Usuario> {
    return this.repository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.grupo', 'g')
      .where('u.id = :id', { id })
      .getOne()
  }

  public obterPorIdDoProvedor(provedor: Provedor, id: string): Promise<Usuario> {
    return this.repository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.grupo', 'g')
      .leftJoinAndSelect('g.permissoes', 'p')
      .where('u.provedor = :provedor', { provedor })
      .andWhere('u.idProvedor = :id', { id })
      .getOne()
  }

  public obterPorEmail(provedor: Provedor, email: string): Promise<Usuario> {
    return this.repository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.grupo', 'g')
      .leftJoinAndSelect('g.permissoes', 'p')
      .where('u.provedor = :provedor', { provedor })
      .andWhere('u.email = :email', { email })
      .getOne()
  }

  public async buscar(termo: string, page: number, pageSize: number): Promise<PagedResult<Usuario[]>> {
    let query = this.repository.createQueryBuilder('u').innerJoinAndSelect('u.grupo', 'g')

    if (termo) {
      query = query
        .where('u.nome LIKE :nome', { nome: `%${termo}%` })
        .orWhere('u.email LIKE :email', { email: `%${termo}%` })
    }

    const [data, count] = await query
      .orderBy('u.nome')
      .skip(page * pageSize)
      .take(pageSize)
      .getManyAndCount()

    return createPagedResult(data, count, page, pageSize)
  }
}
