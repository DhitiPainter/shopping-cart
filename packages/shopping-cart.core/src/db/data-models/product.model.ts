import { ObjectID } from 'bson';
import { Buffer } from 'buffer';
import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const productSchema = new mongoose.Schema({
    user: { type: ObjectID, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    // file: { type: String, data: Buffer },    
    tags: [{ type: String }],
    brand: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    createdBy: { type: ObjectID },
    updatedBy: { type: ObjectID },
    imageName: { type: String },
    imageData: { type: String }
});

productSchema.set('toJSON', { virtuals: true });

const ProductModel = mongoose.model(DbModel.product, productSchema);

export default ProductModel;
