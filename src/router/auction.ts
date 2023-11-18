import express from 'express';

import { createNewAuctionController, getAuctionsController } from '../controllers/auction';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/api/auction', isAuthenticated, createNewAuctionController);
  router.get('/api/auction', isAuthenticated, getAuctionsController);
}