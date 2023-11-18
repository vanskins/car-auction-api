import express from 'express'
import authentication from './authentication'
import users from './users'
import auction from './auction'
import bid from './bid'

const router = express.Router()

export default (): express.Router => {
  authentication(router);
  users(router);
  auction(router);
  bid(router);
  return router
}