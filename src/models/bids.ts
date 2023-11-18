import { Schema, model, models } from 'mongoose';
import Auction from './auctions';

const BidSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    required: [true, 'User Id is required!'],
    ref: 'User' 
  },
  auction: {
    type: Schema.ObjectId,
    required: [true, 'User Id is required!'],
    ref: 'Auction'
  },
  bidPrice: {
    type: Number,
    required: [true, 'Bid price is required!']
  }
}, { timestamps: true });

// BidSchema.pre('save', (this: BidDocument, next) => {
//   console.log(this.auction, 'TEST')
//   next();
// })


const Bid = models.Bid || model("Bid", BidSchema)

export const createBid = (values: Record<string, any>) => new Bid(values).save().then((bid: any) => bid.toObject());

export default Bid;