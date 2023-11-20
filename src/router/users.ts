import express from 'express';

import { getAllUsers, getProfileController } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get('/api/users', isAuthenticated, getAllUsers);
  router.get('/api/profile/me', isAuthenticated, getProfileController);
}