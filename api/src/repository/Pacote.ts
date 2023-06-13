import { createPagedResult } from '../common'
import { Pacote } from '../entity'
import { BaseRepository } from './BaseRepository'

export type FiltroRemessa = 'todos' | 'com-remessa' | 'sem-remessa'

export class PacoteRepository extends BaseRepository<Pacote> {
  constructor() {
    super(Pacote)
  }

  public obter(id: number): Promise<Pacote | undefined> {
    return this.repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.remessa', 'r')
      .where('p.id = :id', { id })
      .getOne()
  }

  async buscar(termo: string, filtro: FiltroRemessa, page: number, pageSize: number) {
    let query = this.repository.createQueryBuilder('p').leftJoinAndSelect('p.remessa', 'r')

    if (termo) {
      query = query.where('p.identificador LIKE :termo OR p.destinatario LIKE :termo', { termo: `%${termo}%` })
    }

    if (filtro === 'com-remessa') {
      query = query.where('p.remessa IS NOT NULL')
    } else if (filtro === 'sem-remessa') {
      query = query.where('p.remessa IS NULL')
    }

    const [data, count] = await query
      .orderBy('p.prazoEntrega')
      .skip(page * pageSize)
      .take(pageSize)
      .getManyAndCount()

    return createPagedResult(data, count, page, pageSize)
  }
}
