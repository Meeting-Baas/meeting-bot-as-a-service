import { Request, Response } from "express";
import { joinMeeting } from "../lib/utils";

export const chat = async (req: Request, res: Response) => {
  const {
    meetingBotName,
    meetingURL,
    meetingBotImage,
    meetingBotEntryMessage,
    apiKey,
  } = req.body;

  const response = await joinMeeting({
    meetingBotName,
    meetingURL,
    meetingBotImage,
    meetingBotEntryMessage,
    apiKey,
  });

  if (response.error) {
    res.status(500).send(response.error);
  } else {
    res.send(response.data);
  }
};
