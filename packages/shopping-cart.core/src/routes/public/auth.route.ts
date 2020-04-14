import UserController from '../../controllers/user.controller';

export const auth = (router: any) => {
    router.post(
        '/register',
        async (req: any, res: any, next: any) => {
            const userController = new UserController();
            const response: any = await userController.registerUser(req.body);
            return res.send(response); // .status(response.status)
        },
    );

    router.post(
        '/authenticate',
        // validate(registerUser),
        async (req: any, res: any, next: any) => {
            let response = {};
            try {
                const userController = new UserController();
                response = await userController.authenticate(req.body);
                // if(res.status && res.status < 200){
                return res.status(200).send(response);
                // } else{
                //     throw response;
                // }
            } catch (error) {
                return res.status(400).send(response);
            }
        },
    );
};

export default auth;
