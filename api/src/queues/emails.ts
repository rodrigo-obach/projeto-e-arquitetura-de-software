import { Queue } from '../queue'

export interface EmailMessage {
  to: string
  subject: string
  html: string
}

export const emailsQueue = new Queue<EmailMessage>('emails')
