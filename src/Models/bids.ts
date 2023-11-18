import { Schema, model, models } from 'mongoose';

const BidSchema = new Schema({

}, { timestamps: true });

const Bid = models.Bid || model("Bid", BidSchema)

export default Bid;