import { Request, Response } from 'express';
import { createBid, getBids, getBidsByAuctionId } from '../models/bids';
import { Schema, Types } from 'mongoose';

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
      auction: new Types.ObjectId(auction),
      bidPrice
    })

    return res.status(200).json(bid).end();
  } catch (error) {
    const errorObj = JSON.parse(error.message)
    return res.status(400).json(errorObj).end();
  }
}

export const getBidsController = async (req: Request, res: Response) => {
  try {
    const bids = await getBids().sort({ createdAt: -1 });
    res.status(200).json(bids).end();
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getBidByAuctionIdController = async (req: Request, res: Response) => {
  try {
    const { auctionId } = req.params;
    const auction = await getBidsByAuctionId(auctionId).populate({ 
      path: 'user',
      select: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }
    }).populate('auction').sort({ createdAt: -1 })
    return res.status(200).json(auction);
  } catch (error) {
    return res.sendStatus(400)
  }
}