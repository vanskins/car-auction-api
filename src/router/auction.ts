import express from 'express';

import { createNewAuctionController, getAuctionsController, getAuctionByIdController } from '../controllers/auction';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get('/api/auction/:id', isAuthenticated, getAuctionByIdController);
  router.post('/api/auction', isAuthenticated, createNewAuctionController);
  router.get('/api/auction', isAuthenticated, getAuctionsController);
}