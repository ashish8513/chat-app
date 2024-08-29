import express from "express"
import { getMessages, sendMessage } from "../controller/message.controller.js";
import secureRoute from '../middleware/secureRoute.js'

const route = express.Router();
route.post("/send/:id",secureRoute, sendMessage)
route.get("/get/:id",secureRoute, getMessages)

export default route;