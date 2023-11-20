import mongoose, { Schema, model, models } from 'mongoose';
import { getAuctionById } from './auctions';

interface IBidSchema {
  user: typeof Schema.ObjectId;
  auction: typeof Schema.ObjectId;
  bidPrice: number;
}

const BidSchema = new Schema<IBidSchema>({
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

BidSchema.pre('validate', async function(next) {
  const auctionId = this.auction;
  try {
    const auction = await getAuctionById(auctionId.toString())
    console.log(auction, 'Auction')
  } catch (error) {
    
  }
  next(new Error('This is error'));
});

BidSchema.pre('save', (next)  => {
  next();
})


const Bid = models.Bid || model<IBidSchema>("Bid", BidSchema)

// Create new Bid
export const createBid = (values: Record<string, any>) => new Bid(values).save().then((bid: any) => bid.toObject());
// GET All Bids
export const getBids = () => Bid.find();
// GET Bid by id
export const getBidById = (id: string) => Bid.findById(id);
// DELETE Bid by id
export const deleteBidById = (id: string) => Bid.findByIdAndDelete(id);



export default Bid;