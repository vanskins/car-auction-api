import { Request, Response } from 'express'
import { getUserByEmail, createNewUSer } from '../models/users'
import { random, authentication } from '../helpers'

export const register = async (req: Request, res: Response ) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      res.sendStatus(400)
    }

    const checkExistingUser = await getUserByEmail(email)

    if (checkExistingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createNewUSer({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    })

    return res.status(200).json(user).end();

  } catch (error) {
    return res.sendStatus(400)
  }
}