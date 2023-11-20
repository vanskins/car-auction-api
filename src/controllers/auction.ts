import { Request, Response } from 'express';
import { createNewAuction, getAuctions, getAuctionById, getAuctionByUserId, updateAuctionById, deleteAuctionById } from '../models/auctions'
import { Schema } from 'mongoose';

declare module 'express' {
  interface Request {
    identity?: {
      _id: typeof Schema.ObjectId;
      roles: string[];
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
    }).sort({ createdAt: -1 })
    return res.status(200).json(auctions);
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const getAuctionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const auction = await getAuctionById(id).populate({ 
      path: 'user',
      select: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }
    })
    return res.status(200).json(auction);
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const getAuctionByUserIdController = async (req: Request, res: Response) => {
  try {
    const auctions = await getAuctionByUserId(req.identity._id.toString()).populate({ 
      path: 'user',
      select: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }
    }).sort({ createdAt: -1 })
    return res.status(200).json(auctions);
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const adminCloseAuctionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { identity } = req;
    
    if (identity.roles.includes('admin')) {
      await updateAuctionById({ open: false }, id)
      return res.status(200).json(identity).end()
    }
    return res.sendStatus(401)
  } catch (error) {
    console.log(error, 'error')
    return res.sendStatus(400)
  }
}

export const adminDeleteAuctionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { identity } = req;
    
    if (identity.roles.includes('admin')) {
      await deleteAuctionById(id)
      return res.status(200).json(identity).end()
    }
    return res.sendStatus(401)
  } catch (error) {
    console.log(error, 'error')
    return res.sendStatus(400)
  }
}