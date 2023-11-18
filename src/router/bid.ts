import express from 'express';

import { createBidController } from '../controllers/bid';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/api/bid', isAuthenticated, createBidController);
  // router.get('/api/bid', isAuthenticated, getAuctionsController);
}