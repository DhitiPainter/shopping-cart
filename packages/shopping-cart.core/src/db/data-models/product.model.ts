import { Buffer } from 'buffer';
import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    tags: [{ type: String }],
    brand: { type: String },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageName: { type: String },
    imageData: { type: String },
    defaultImage: { type: String },
    availabileQty: { type: Number },
    // file: { type: String, data: Buffer },
});

productSchema.set('toJSON', { virtuals: true });

const ProductModel = mongoose.model(DbModel.product, productSchema);

export default ProductModel;
