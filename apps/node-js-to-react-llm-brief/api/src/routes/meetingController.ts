import { Request, Response } from "express";
import { fetchBotDetails } from "../lib/fetchBotDetails";
import { deleteMeeting } from "../db/queries";

export const meeting = async (req: Request, res: Response) => {
  const botId = req.params.botId;
  // todo: cleanup fetchBotDetails and joinMeeting later
  const details = await fetchBotDetails({
    botId,
    apiKey: process.env.BASS_API_KEY || "",
  });

  res.json(details);
};

export const deleteController = async (req: Request, res: Response) => {
  const botId = req.params.botId;
  const response = await deleteMeeting(parseInt(botId) || 0);
  console.log('deleted', response);

  res.json({ botId });
}