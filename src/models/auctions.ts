import { Schema, model, models } from 'mongoose';

const AuctionSchema = new Schema({

}, { timestamps: true });

const Auction = models.Auction || model("Auction", AuctionSchema)

export default Auction;