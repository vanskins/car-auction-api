import { Request, Response } from "express";
import { getUsers, getUserById } from "../models/users";
import { Schema } from 'mongoose';

declare module 'express' {
  interface Request {
    identity?: {
      _id: typeof Schema.ObjectId;
    };
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.identity._id.toString());
    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(400);
  }
}