import mongoose, { Schema, model, models } from 'mongoose';
import { getAuctionById, updateAuctionById } from './auctions';

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
  const bidPrice = this.bidPrice;
  try {
    const auction = await getAuctionById(auctionId.toString())
    // Error code block if auction has already been closed.
    if (auction && !auction.open) {
      return next(new Error(JSON.stringify({ code: 1, message: 'Auction has already been closed.'})));
    }
    // Error code block if user will bid on itself.
    if (auction.user.toString() === this.user.toString()) {
      next(new Error(JSON.stringify({ code: 2, message: 'Cannot bid on yourself.'})));
    }
    // Error code if user bid at a lower price from the latest bid.
    if (bidPrice <= auction.priceIncrement) {
      return next(new Error(JSON.stringify({ code: 3, message: 'Your bid price is lower than the latest bid price.'})));
    }
    // IF bid price is greater than the price increment of the auction then bid will be placed.
    await updateAuctionById({
      priceIncrement: auction.priceIncrement + bidPrice
    }, auctionId.toString())
    console.log(auction, 'Auction')
    return next();
  } catch (error) {
    next(new Error('This is error'));
  }
  
});

BidSchema.pre('save', (next)  => {
  next();
})


const Bid = models.Bid || model<IBidSchema>("Bid", BidSchema)

// Create new Bid
export const createBid = (values: Record<string, any>) => new Bid(values).save().then((bid: any) => bid.toObject());
// GET All Bids
export const getBids = () => Bid.find();
// GET all bids by Auction Id
export const getBidsByAuctionId = (auctionId: string) => Bid.find({ auction: auctionId })
// GET latest bid by Auction Id
export const getLatestBidByAuctionId = (auctionId: string) => Bid.findOne({ auction: auctionId }).sort({ createdAt: -1 })
// GET Bid by id
export const getBidById = (id: string) => Bid.findById(id);
// DELETE Bid by id
export const deleteBidById = (id: string) => Bid.findByIdAndDelete(id);



export default Bid;