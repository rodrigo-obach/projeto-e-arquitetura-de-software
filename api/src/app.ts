import cors from 'cors'
import express, { Response as ExResponse, Request as ExRequest } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import { AppDataSource } from './data-source'
import { RegisterRoutes } from '../build/routes'
import { useGoogleAuth } from './api/auth/google'
import { initAuth } from './api/auth/init'
import { getConfigSection } from './config'
import { errorMiddleware } from './api/middlewares/error.middleware'

AppDataSource.initialize().catch((error) => console.error('Data sourcer error.', error))

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
RegisterRoutes(app)
app.use(errorMiddleware)

initAuth(passport)
useGoogleAuth(app, passport)
app.use(passport.initialize())

app.use('/api/docs', swaggerUi.serve, async (_: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
})

const { port } = getConfigSection((c) => c.server)
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/`)
})
