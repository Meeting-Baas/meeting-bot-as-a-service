import { Request, Response } from "express";
import { fetchBotDetails } from "../lib/fetchBotDetails";

export const meeting = async (req: Request, res: Response) => {
  const botId = req.params.botId;
  // todo: cleanup fetchBotDetails and joinMeeting later
  const details = await fetchBotDetails({
    botId,
    apiKey: process.env.BASS_API_KEY || "",
  });

  res.json(details);
};
