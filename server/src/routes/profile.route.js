import { Router } from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { updateProfilePicture } from '../controllers/profile.controller.js';


const profileRoutes = Router();

profileRoutes.put("/update-profile", protectRoute, updateProfilePicture);

export default profileRoutes;