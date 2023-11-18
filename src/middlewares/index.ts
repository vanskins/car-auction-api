import { Request, Response } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isAuthenticated = async (req: Request, res: Response) => {
  
}