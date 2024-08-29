import express from 'express';
import { allUsers, login, logout, signup } from '../controller/user.contoller.js'
import secureRoute from '../middleware/secureRoute.js';

const route = express.Router();

route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', logout)
route.get('/allUsers', secureRoute,allUsers)


export default route;