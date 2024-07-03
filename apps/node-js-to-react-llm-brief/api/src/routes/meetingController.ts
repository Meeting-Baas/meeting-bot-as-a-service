import { Request, Response } from "express";
import { getMeetings } from "../db/queries";

export const meeting = async (req: Request, res: Response) => {
  const meetings = await getMeetings();
  res.json(meetings);
};
