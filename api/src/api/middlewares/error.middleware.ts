import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa'
import { AppError } from '../../common/app-error'

export function errorMiddleware(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    return res.status(400).json({
      message: 'Campos inválidos: ' + Object.keys(err?.fields)
    })
  }

  if (err instanceof AppError) {
    return res.status(400).json({
      message: err.message
    })
  }

  if (err instanceof Error) {
    console.error(err)
    return res.status(500).json({
      message: 'Ocorreu um erro'
    })
  }

  next()
}
