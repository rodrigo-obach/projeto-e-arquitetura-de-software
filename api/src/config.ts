import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  app: {
    convite: {
      expiracao: getInteger('APP_CONVITE_EXPIRACAO'),
      url: getString('APP_CONVITE_URL')
    }
  },
  auth: {
    google: {
      clientId: getString('AUTH_GOOGLE_CLIENT_ID'),
      clientSecret: getString('AUTH_GOOGLE_CLIENT_SECRET'),
      redirectUri: getString('AUTH_GOOGLE_REDIRECT_URI')
    }
  },
  graphHopper: {
    url: getString('GRAPH_HOPPER_URL'),
    apiKey: getString('GRAPH_HOPPER_API_KEY'),
  },
  rabbitMQ: {
    url: getString('RABBITMQ_URL'),
  },
  db: {
    host: getString('DB_HOST'),
    port: getInteger('DB_PORT'),
    username: getString('DB_USERNAME'),
    password: getString('DB_PASSWORD'),
    database: getString('DB_DATABASE')
  },
  server: {
    port: getInteger('SERVER_PORT')
  },
  smtp: {
    host: getString('SMTP_HOST'),
    port: getInteger('SMTP_PORT'),
    secure: getBoolean('SMTP_SECURE'),
    user: getString('SMTP_USER', false),
    password: getString('SMTP_PASSWORD', false)
  }
}

type ConfigType = typeof config

export function getConfig(): ConfigType {
  return config
}

export function getConfigSection<T>(selector: (config: ConfigType) => T): T {
  return selector(config)
}

function getBoolean(key: string, required: boolean = true): boolean {
  return getEnv(key, required, (value) => {
    return {
      parsedValue: /^(1|true)$/i.test(value),
      isValid: /^(0|1|false|true)$/i.test(value)
    }
  })
}

function getInteger(key: string, required: boolean = true): number {
  return getEnv(key, required, (value) => {
    const parsedValue = parseInt(value, 10)
    return {
      parsedValue,
      isValid: !isNaN(parsedValue)
    }
  })
}

function getString(key: string, required: boolean = true): string {
  return getEnv(key, required, (value) => ({
    parsedValue: value,
    isValid: true
  }))
}

function getEnv<T>(key: string, required: boolean, parse: (value: string) => { parsedValue: T; isValid: boolean }): T {
  const value = process.env[key]
  if (required && !value) {
    throw new Error(`A variável de ambiente "${key}" não foi definada.`)
  }

  const { parsedValue, isValid } = parse(value)
  if (!isValid) {
    throw new Error(`O valor da variável de ambiente "${key}" é inválido.`)
  }

  return parsedValue
}
