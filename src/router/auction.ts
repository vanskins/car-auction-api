import express from 'express';

import { createNewAuctionController } from '../controllers/auction';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/api/auction', isAuthenticated, createNewAuctionController);
}