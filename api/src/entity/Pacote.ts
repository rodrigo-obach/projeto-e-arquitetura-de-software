import { Entity, Column, BaseEntity, ManyToOne, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Remessa } from './Remessa'

@Entity()
export class Pacote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  @Index({ unique: true })
  identificador: string

  @Column('date')
  prazoEntrega: Date

  @Column({ length: 200 })
  destinatario: string

  @Column({ length: 500 })
  endereco: string

  @Column({ length: 100 })
  complemento: string

  @Column('double')
  latitude: number

  @Column('double')
  longitude: number

  @ManyToOne(() => Remessa, (remessa) => remessa.pacotes)
  @Index()
  remessa: Remessa

  constructor(init?: Partial<Pacote>) {
    super()
    Object.assign(this, init)
  }
}
