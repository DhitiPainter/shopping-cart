/**************************************
 * expose all api routes from private
 ***************************************/

import Express from 'express';

// create router instance
const router = Express.Router();

import user from './user.route';
user(router);

import product from './product.route';
product(router);

export default router;
