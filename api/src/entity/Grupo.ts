import { Entity, Column, BaseEntity, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm'
import { Permissao } from './'
import { Usuario } from './'

@Entity()
export class Grupo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  nome: string

  @OneToMany(() => Usuario, (usuario) => usuario.grupo)
  usuarios: Usuario[]

  @ManyToMany(() => Permissao)
  @JoinTable()
  permissoes: Permissao[]

  constructor(init?: Partial<Grupo>) {
    super()
    Object.assign(this, init)
  }
}
