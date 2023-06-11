import { BaseEntity, EntityTarget, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'

export class BaseRepository<T extends BaseEntity> {
  private _repository: Repository<T>

  public constructor(target: EntityTarget<T>) {
    this._repository = AppDataSource.getRepository(target)
  }

  protected get repository() {
    return this._repository
  }

  public async salvar(entities: T | T[]): Promise<void> {
    await (Array.isArray(entities) ? this.repository.save(entities) : this.repository.save(entities))
  }

  public async excluir(entities: T | T[]): Promise<void> {
    await (Array.isArray(entities) ? this.repository.remove(entities) : this.repository.remove(entities))
  }
}
