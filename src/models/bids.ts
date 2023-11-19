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

BidSchema.pre('validate', function(next) {
  console.log('this gets printed first', this.auction);
  next(new Error('This is error'));
});

BidSchema.pre('save', (next)  => {
  next();
})


const Bid = models.Bid || model("Bid", BidSchema)

export const createBid = (values: Record<string, any>) => new Bid(values).save().then((bid: any) => bid.toObject());

export default Bid;