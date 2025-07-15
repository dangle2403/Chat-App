import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { get } from "mongoose";

const messageRouter = Router(); 

messageRouter.get("/users", protectRoute, getUserForSidebar);

export default messageRouter;