import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { getUserForSidebar, getMessages } from "../controllers/message.controller.js";

const messageRouter = Router(); 

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, )


export default messageRouter;