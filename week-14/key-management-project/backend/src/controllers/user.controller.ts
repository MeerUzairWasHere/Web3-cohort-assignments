import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UnauthenticatedError } from "../errors/index.js";
import {
  createTokenUser,
  attachCookiesToResponse,
  comparePassword,
  hashPassword,
} from "../utils/index.js";

import { prismaClient } from "../index.js";

export const showCurrentUser = async (req: Request, res: Response) => {
  const wallet = await prismaClient.wallet.findFirst({
    where: {
      userId: Number(req?.user?.userId),
    },
  });
  res.status(StatusCodes.OK).json({
    user: req.user,
    wallet: {
      publicKey: wallet?.publicKey,
      privateKey: wallet?.privateKey,
    },
  });
};

// Update user information
export const updateUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  // Update the user with Prisma
  const user = await prismaClient.user.update({
    where: { id: Number(req.user?.userId) },
    data: { email, name },
  });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken: "" });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Update user password
export const updateUserPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user = await prismaClient.user.findUnique({
    where: { id: Number(req.user?.userId) },
  });

  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  // Check if the old password is correct
  const isPasswordCorrect = await comparePassword(oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Hash the new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update the password with Prisma
  await prismaClient.user.update({
    where: { id: Number(req.user?.userId) },
    data: { password: hashedNewPassword },
  });

  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};
