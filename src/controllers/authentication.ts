import { Request, Response } from 'express'
import { getUserByEmail, createNewUSer } from '../models/users'
import { random, authentication } from '../helpers'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password} = req.body;
    
    if (!email || !password) {
      return res.sendStatus(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
    if (!user) {
      return res.sendStatus(401)
    }

    const expectedHash = authentication(user?.authentication.salt, password)

    if (user?.authentication.password !== expectedHash) {
      return res.sendStatus(403)
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('CAR-AUCTION-API-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'})

    return res.status(200).json(user).end()

  } catch (error) {
    return res.sendStatus(401)
  }
}

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