import UserController from '../../controllers/user.controller';

export const auth = (router: any) => {

    router.get(
        '/roles',
        async (req: any, res: any, next: any) => {
            let response = {};
            try {
                const userController = new UserController();
                response = await userController.roles();
                return res.status(200).send(response);
            } catch (error) {
                return res.status(400).send(response);
            }
        },
    );

    router.post(
        '/register',
        async (req: any, res: any, next: any) => {
            let response = {};
            try {
                const userController = new UserController();
                response = await userController.registerUser(req.body);
                return res.status(200).send(response);
            } catch (error) {
                return res.status(400).send(response);
            }
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
                return res.status(400).send(error);
            }
        },
    );
};

export default auth;
