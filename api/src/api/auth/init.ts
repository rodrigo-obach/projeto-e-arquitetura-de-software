import { PassportStatic } from 'passport'

export function initAuth(passport: PassportStatic) {
  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })
}
