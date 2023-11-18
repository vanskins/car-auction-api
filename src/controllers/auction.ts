import { Request, Response } from 'express';
import { createNewAuction } from '../models/auctions'
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
    console.log(error, 'ERROR')
    return res.sendStatus(400)
  }
}