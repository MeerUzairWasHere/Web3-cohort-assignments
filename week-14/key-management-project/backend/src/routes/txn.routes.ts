import { NextFunction, Router, Request, Response } from "express";
import { authenticateUser } from "../middlewares/authentication.js";
import { status, sign } from "../controllers/txn.controller.js";

const router = Router();

router.route("/sign").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction): any => sign(req, res)
);

router.route("/:id").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => status(req, res)
);

export default router;
