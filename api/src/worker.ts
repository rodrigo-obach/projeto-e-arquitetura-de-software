import { sendEmail } from "./email/email"
import { emailsQueue } from "./queues/emails"

emailsQueue.consume(async (id, message) => {
  console.log(`[${new Date().toISOString()}] Mensagem recebida (ID: ${id})`)

  try {
    await sendEmail(message)
    return true
  } catch (e) {
    console.error(`[${new Date().toISOString()}] Falha ao enviar e-mail (ID: ${id})`, e)
    return false
  }
})
