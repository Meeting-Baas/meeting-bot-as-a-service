import { markdownToBlocks } from "@tryfabric/martian";
import { Request, Response } from "express";
import { createNotionPage, summarizeTranscript } from "../lib/utils";

interface TranscriptEntry {
  speaker: string;
  words: Array<{
    start: number;
    end: number;
    word: string;
  }>;
}

export const webhook = async (req: Request, res: Response) => {
  const eventData = req.body;
  const now = new Date();
  console.log("HERE");
  console.log("evenData", eventData);

  if (eventData.event === "complete" && eventData.data.transcript) {
    const transcript = eventData.data.transcript;
    console.log(
      "Transcript: ",
      transcript
        .map(
          (entry: TranscriptEntry) =>
            `${entry.speaker}: ${entry.words
              .map((word) => word.word)
              .join(" ")}`
        )
        .join("\n")
    );

    const summary = await summarizeTranscript(transcript);
    console.log("summary", summary);

    if (summary) {
      const children = markdownToBlocks(summary);
      if (children) {
        const speakers = eventData.data.speakers;
        await createNotionPage(children, speakers, now);
      }
    }
  }
  res.sendStatus(200);
};
