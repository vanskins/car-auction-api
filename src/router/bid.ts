import express from 'express';

import { createBidController, getBidsController } from '../controllers/bid';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/api/bid', isAuthenticated, createBidController);
  router.get('/api/bid', isAuthenticated, getBidsController);
}