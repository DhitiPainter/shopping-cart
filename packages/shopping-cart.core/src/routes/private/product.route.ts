import ProductController from './../../controllers/product.controller';

export const productRoutes = (router: any) => {
    const productController = new ProductController();

    router.get('/getAllProducts',
        async (req: any, res: any, next: any) => {
            const authorization: string = req.headers.authorization;
            const response: any = await productController.getProducts();
            return res.status(response.status).send(response);
        },
    );

    router.get('/getProductsByTags',
        async (req: any, res: any, next: any) => {
            const authorization: string = req.headers.authorization;
            const response: any = await productController.getProductsByTags(req.body);
            return res.status(response.status).send(response);
        },
    );

    router.post(
        '/addProduct',
        async (req: any, res: any, next: any) => {
            const response = await productController.addProduct(req.body);
            return res.status(response.status).send(response);
        },
    );
};

export default productRoutes;
