import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../middlewares/authentication.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";

import { registerUser, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  validateRegisterInput,
  (req: Request, res: Response, next: NextFunction) => registerUser(req, res)
);

router.post(
  "/login",
  validateLoginInput,
  (req: Request, res: Response, next: NextFunction) => login(req, res)
);

router.delete(
  "/logout",
  authenticateUser,
  (req: Request, res: Response, next: NextFunction) => logout(req, res)
);

export default router;
