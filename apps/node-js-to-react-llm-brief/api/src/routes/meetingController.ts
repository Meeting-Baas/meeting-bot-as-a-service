import { Request, Response } from "express";
import { getMeetings } from "../db/queries";

export const meeting = async (req: Request, res: Response) => {
  // get path
  const botId = req.params.botId;
  console.log(botId)

  res.json({
    "hello": "world"
  });
};
