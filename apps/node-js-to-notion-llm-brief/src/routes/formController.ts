import { Request, Response } from "express";
import { joinMeeting } from "../lib/utils";

export const form = async (req: Request, res: Response) => {
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
    res.locals.title = "Error";
    res.render("pages/error", { error: "Error joining meeting" })
  } else {
    res.locals.title = "Success";
    res.render("pages/success");
  }
};
