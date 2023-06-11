import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { getConfigSection } from './config'
import { Grupo, Pacote, Permissao, Remessa, Usuario } from './entity'
import { Inicial1686235411898 } from './migration/1686235411898-Inicial'
import { Permissoes1686246581232 } from './migration/1686246581232-Permissoes'

const config = getConfigSection((c) => c.db)

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: true,
  logging: false,
  entities: [Pacote, Permissao, Remessa, Usuario, Grupo],
  migrations: [
    Inicial1686235411898,
    Permissoes1686246581232
  ],
  subscribers: []
})
