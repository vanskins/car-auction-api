import { Schema, model, models } from 'mongoose';

const AuctionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    required: [true, 'User Id is required!'],
    ref: 'User' 
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required!']
  },
  year: {
    type: String,
    required: [true, 'Year model is required!']
  },
  model: {
    type: String,
    required: [true, 'Model is required!']
  },
  openingPrice: {
    type: Number,
    required: [true, 'Opening price is required!']
  },
  priceIncrement: {
    type: Number,
    default: 0
  },
  expiryDate: {
    type: String,
    required: [true, 'Expiry date required!']
  }
}, { timestamps: true });

const Auction = models.Auction || model("Auction", AuctionSchema)

// Get all auctions
export const getAuctions = () => Auction.find();
// Get auction by id
export const getAuctionById = (_id: string) => Auction.findById(_id);
// Get auctions by User id
export const getAuctionByUserId = (userId: string) => Auction.find({ user: userId });
// Delete auction by id
export const deleteAuctionById = (_id: string) => Auction.findByIdAndDelete(_id);
// Create new auction
export const createNewAuction = (values: Record<string, any>) => new Auction(values).save().then((auction: any) => auction.toObject());
export default Auction;