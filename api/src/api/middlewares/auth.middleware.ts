import * as express from 'express'
import passport from 'passport'

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  const token = request.headers.authorization?.replace(/^Bearer\s+/, '')

  return new Promise((resolve, reject) => {
    const middleware = passport.authenticate('google-verify-token', (error, user) => {
      if (error) {
        reject(error)
      } else if (!user) {
        reject({ status: 401 })
      } else if (scopes?.length && !scopes.every((s) => user?.hasPermission(s))) {
        reject({ status: 403 })
      } else {
        resolve(user)
      }
    })

    middleware(request, {}, () => {})
  })
}
