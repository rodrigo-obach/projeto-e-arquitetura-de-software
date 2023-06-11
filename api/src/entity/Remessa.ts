import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pacote } from './'

@Entity()
export class Remessa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  descricao: string

  @Column('date')
  data: Date

  @OneToMany(() => Pacote, (pacote) => pacote.remessa)
  pacotes: Pacote[]

  constructor(init?: Partial<Remessa>) {
    super()
    Object.assign(this, init)
  }
}
