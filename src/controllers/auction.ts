import { Request, Response } from 'express';
import { createNewAuction, getAuctions } from '../models/auctions'
import { Schema } from 'mongoose';

declare module 'express' {
  interface Request {
    identity?: {
      _id: typeof Schema.ObjectId
    };
  }
}

export const createNewAuctionController = async (req: Request, res: Response) => {
  try {
    const { brand, year, model, openingPrice, expiryDate } = req.body;

    if (!brand || !year || !model || !openingPrice || !expiryDate) {
      return res.sendStatus(400)
    }

    const auction = await createNewAuction({
      user: req.identity._id,
      brand,
      year,
      model,
      openingPrice,
      expiryDate,
    })

    return res.status(200).json(auction).end();
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const getAuctionsController = async (req: Request, res: Response) => {
  try {
    const auctions = await getAuctions().populate({ 
      path: 'user',
      select: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }
    })
    return res.status(200).json(auctions);
  } catch (error) {
    return res.sendStatus(400)
  }
}