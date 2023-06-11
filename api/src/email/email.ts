import nodemailer from 'nodemailer'
import { getConfigSection } from '../config'

const config = getConfigSection((x) => x.smtp)

const transporter = nodemailer.createTransport({
  port: config.port,
  host: config.host,
  secure: config.secure,
  auth: {
    user: config.user,
    pass: config.password
  }
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export function sendEmail(options: EmailOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(options, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
