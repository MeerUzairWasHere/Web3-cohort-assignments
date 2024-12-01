import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const sign = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "test" });
};

export const status = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "test" });
};
