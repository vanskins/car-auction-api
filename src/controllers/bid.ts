import { Request, Response } from 'express';
import { createBid } from '../models/bids';
import { Schema } from 'mongoose';

declare module 'express' {
  interface Request {
    identity?: {
      _id: typeof Schema.ObjectId
    };
  }
}

export const createBidController = async (req: Request, res: Response) => {
  try {
    const { auction, bidPrice } = req.body;

    const bid = await createBid({
      user: req.identity._id,
      auction,
      bidPrice
    })

    return res.status(200).json(bid).end();
  } catch (error) {
    res.sendStatus(400)
  }
}