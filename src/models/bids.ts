import { Schema, model, models } from 'mongoose';

const BidSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    required: [true, 'User Id is required!'],
    ref: 'User' 
  },
}, { timestamps: true });

const Bid = models.Bid || model("Bid", BidSchema)

export default Bid;