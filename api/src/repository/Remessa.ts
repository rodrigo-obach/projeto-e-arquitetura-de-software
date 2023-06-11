import { createPagedResult } from '../common'
import { Remessa } from '../entity'
import { BaseRepository } from './BaseRepository'

export class RemessaRepository extends BaseRepository<Remessa> {
  constructor() {
    super(Remessa)
  }

  public obter(id: number): Promise<Remessa | undefined> {
    return this.repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.pacotes', 'p')
      .where('r.id = :id', { id })
      .getOne()
  }


  async buscar(page: number, pageSize: number) {
    const [data, count] = await this.repository
      .createQueryBuilder('r')
      .orderBy('r.data')
      .skip(page * pageSize)
      .take(pageSize)
      .getManyAndCount()

    return createPagedResult(data, count, page, pageSize)
  }
}
