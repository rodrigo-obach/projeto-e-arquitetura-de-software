import { Grupo } from "../entity"
import { BaseRepository } from "./BaseRepository"


export class GrupoRepository extends BaseRepository<Grupo> {
  constructor() {
    super(Grupo)
  }

  public obter(id: number): Promise<Grupo> {
    return this.repository
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.permissoes', 'p')
      .where('g.id = :id', { id })
      .getOne()
  }

  public async listarTodos(): Promise<Grupo[]> {
    return this.repository.createQueryBuilder('g').orderBy('g.nome').getMany()
  }
}
