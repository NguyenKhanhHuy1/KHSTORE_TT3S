
import express from 'express'
import exitsHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

import cors from 'cors'
import bodyParser from 'body-parser'

const START_SERVER = () => {

  const app = express()

  app.use(cors())
  //enable req.body json
  app.use(express.json())

  app.use(bodyParser.urlencoded({
    extended: true
  }))


  //use API v1
  app.use('/v1', APIs_V1)

  //Middleware
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitsHook(() => {
    console.log('Exiting app')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to db'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
