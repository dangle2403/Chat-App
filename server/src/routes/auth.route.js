import router from 'express';
import { signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const authRouter = router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/check", protectRoute, checkAuth);
export default authRouter;