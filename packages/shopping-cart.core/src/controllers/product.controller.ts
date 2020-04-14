import * as productService from './../db/service/product.service';

export default class ProductController {
    public getProducts = async () => {
        try {
            return await productService.getAllProducts();
        } catch (error) {
            console.log(error);
            return { error, status: 500, success: false };
        }
    }

    public getProductsByTags = async (tags: any[]) => {
        try {
            return await productService.getProductsByTags(tags);
        } catch (error) {
            console.log(error);
            return { error, status: 500, success: false };
        }
    }

    public addProduct = async (requestParams: any) => {
        try {
            return await productService.addProduct(requestParams);
        } catch (error) {
            console.log(error);
            return { error, status: 500, success: false };
        }
    }
}
