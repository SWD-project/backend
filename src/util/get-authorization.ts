import { Request } from "express";

export const getAuthorization = (req: Request) => {
  const uuid = req.get("Authorization");
  if (!uuid) {
    throw new Error("Unauthenticated");
  }
  return uuid;
};
