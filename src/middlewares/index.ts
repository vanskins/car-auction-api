import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['CAR-AUCTION-API-AUTH'];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const checkExistingUser = await getUserBySessionToken(sessionToken)
    if (!checkExistingUser) {
      return res.sendStatus(403)
    }

    merge(req, { identity: checkExistingUser})

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}