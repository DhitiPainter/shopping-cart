import _ from 'lodash';
import mongoose from 'mongoose';
import db from './../../db/helper';
const ProductModel = db.Product;

export async function getAllProducts() {
    try {
        const products = await ProductModel.find();
        return { message: 'Products retrieved successfully.', products, status: 200, success: true };
    } catch (error) {
        return { message: 'Exception encountered', error, status: 500, success: false };
    }
}

export async function getProductsByTags(tags: any[]) {
    try {
        let products: any[];
        const matchingProducts: any[] = [];
        products = this.getAllProducts().products;
        products.forEach((product: any) => {
            const matchingTags = tags.filter((tag: any) => product.tags.includes(tag));
            if (matchingTags.length > 0) {
                matchingProducts.push(product);
            }
        });
        return { message: 'Products retrieved successfully.', matchingProducts, status: 200, success: true };
    } catch (error) {
        return { message: 'Error adding product', error, status: 500, success: false };
    }
}

export async function addProduct(productParam: any) {
    try {
        let product: any;
        product = new ProductModel(productParam);
        product.imageData = productParam.file ? productParam.file.path : null;
        product.imageName = productParam.imageName ? productParam.imageName : null;
        product.createdBy = mongoose.Types.ObjectId(productParam.user);
        product.user = mongoose.Types.ObjectId(productParam.user);
        await product.save();
        return { message: 'Product added successfully.', product, status: 200, success: true };
    } catch (error) {
        return { message: 'Error adding product', error, status: 500, success: false };
    }
}
