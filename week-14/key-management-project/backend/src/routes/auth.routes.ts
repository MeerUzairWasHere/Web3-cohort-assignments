import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import { authenticateUser } from "../middlewares/authentication";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware";

import { registerUser, login, logout } from "../controllers/auth.controller";

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
