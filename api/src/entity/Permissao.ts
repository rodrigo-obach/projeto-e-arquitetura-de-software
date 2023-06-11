import { Entity, Column, BaseEntity, ManyToMany, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Grupo } from './'

@Entity()
export class Permissao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  @Index({ unique: true })
  chave: string

  @Column({ length: 200 })
  nome: string

  @ManyToMany(() => Grupo)
  grupos: Grupo[]

  constructor(init?: Partial<Permissao>) {
    super()
    Object.assign(this, init)
  }
}
