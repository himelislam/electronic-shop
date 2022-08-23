import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     comment: { type: String, required: true },
//     rating: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const manageAuctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    auction: { type: String },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: String, required: true },
    
  },
  {
    timestamps: true,
  }
);

const ManageAuction = mongoose.model('manageAuction', manageAuctionSchema);
export default ManageAuction;
