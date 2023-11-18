import crypto from 'crypto';


export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
  const secret: string = process.env.SECRET;
  return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex')
}