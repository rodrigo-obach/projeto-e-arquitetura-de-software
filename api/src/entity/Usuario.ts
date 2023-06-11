import { Entity, Column, BaseEntity, ManyToOne, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Grupo } from './'

export enum Provedor {
  Google = 'Google'
}

@Entity()
@Index(['idProvedor', 'provedor'], { unique: true })
@Index(['email', 'provedor'], { unique: true })
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30 })
  provedor: string

  @Column({ length: 200, nullable: true })
  idProvedor: string

  @Column({ length: 300 })
  nome: string

  @Column({ length: 320 })
  email: string

  @ManyToOne(() => Grupo, (grupo) => grupo.usuarios)
  @Index()
  grupo: Grupo

  @Column()
  ativo: boolean

  constructor(init?: Partial<Usuario>) {
    super()
    Object.assign(this, init)
  }
}
