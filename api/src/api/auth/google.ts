import { Application } from 'express'
import { PassportStatic } from 'passport'
import { Strategy } from 'passport-google-verify-token'
import { getConfigSection } from '../../config'
import { Provedor } from '../../entity/Usuario'
import { UsuarioRepository } from '../../repository/Usuario'
import { AppUser } from './app-user'

const config = getConfigSection((c) => c.auth.google)

export function useGoogleAuth(app: Application, passport: PassportStatic) {
  passport.use(
    new Strategy(config, (parsedToken: any, googleId: string, done: (error, user) => void) => {
      loadUser(googleId, parsedToken.name, parsedToken.email).then((usuario) => done(null, usuario))
    })
  )
}

async function loadUser(googleId: string, name: string, email: string): Promise<AppUser> {
  const repository = new UsuarioRepository()
  const usuario =
    (await repository.obterPorIdDoProvedor(Provedor.Google, googleId)) ??
    (await repository.obterPorEmail(Provedor.Google, email))

  if (usuario && !usuario.idProvedor) {
    usuario.idProvedor = googleId
    await repository.salvar(usuario)
  }

  const permissoes = usuario?.ativo ? usuario?.grupo?.permissoes?.map((p) => p.chave) : []
  return new AppUser(googleId, name, email, usuario?.id, permissoes)
}
