import { Channel, connect } from 'amqplib'
import { randomUUID } from 'crypto'
import { getConfigSection } from './config'

const config = getConfigSection((c) => c.rabbitMQ)

export class Queue<T> {
  private channel: Channel

  constructor(private name: string) {}

  async consume(callback: (id: string, message: T) => Promise<boolean>): Promise<void> {
    const channel = await this.getOrCreateChannel()
    await channel.consume(this.name, (message) => {
      if (!message) {
        console.warn(`Mensagem vazia recebida de "${this.name}".`)
        return
      }

      const id = message.properties.messageId
      const content = this.deserialize(message.content)

      callback(id, content)
        .then((result) => {
          if (result) {
            channel.ack(message)
          } else {
            channel.nack(message, false, true)
          }
        })
        .catch(() => channel.nack(message, false, true))
    })
  }

  public async send(message: T) {
    const channel = await this.getOrCreateChannel()

    return new Promise<string>((resolve, reject) => {
      const id = randomUUID()
      const content = this.serialize(message)
      const sent = channel.sendToQueue(this.name, content, { messageId: id })

      if (sent) {
        resolve(id)
      } else {
        reject(new Error(`Mensagem não enviada (ID: ${id})`))
      }
    })
  }

  private async getOrCreateChannel() {
    if (!this.channel) {
      const connection = await connect(config.url)
      this.channel = await connection.createConfirmChannel()
      await this.channel.assertQueue(this.name, {
        durable: true,
        deadLetterExchange: `${this.name}-dead-letter`
      })
    }

    return this.channel
  }

  private deserialize(buffer: Buffer): T {
    const json = buffer.toString()
    return JSON.parse(json) as T
  }

  private serialize(message: T) {
    const json = JSON.stringify(message)
    return Buffer.from(json)
  }
}
