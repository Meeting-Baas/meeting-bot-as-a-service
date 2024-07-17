import { fetchBotDetailsWrapper as fetchBotDetails } from "@/lib/axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the server availability type
export type ServerAvailability = "server" | "local" | "error";

// Define the recording info type
export type RecordingInfo = {
  bot_id: string;
  name: string;
  attendees: string[];
  createdAt: Date;
};

export type MeetingInfo = {
  data: {
    id: string;
    name: string;
    editors: [
      {
        video: {
          transcripts: [
            {
              speaker: string;
              words: [
                {
                  start_time: number;
                  end_time: number;
                  text: string;
                }
              ];
            }
          ];
        };
      }
    ];
    attendees: [
      { name: string }
    ];
    assets: [
      {
        mp4_s3_path: string;
      }
    ];
    created_at: {
      secs_since_epoch: number,
      nanos_since_epoch: number
    }
  };
};

export const fetchBotData = (
  baasApiKey: string,
  serverAvailability: ServerAvailability
) => {
  return async (botId: string): Promise<MeetingInfo> => {
    const res = await fetchBotDetails({
      baasApiKey,
      serverAvailability,
      botId,
      raw: true,
    });
    return res.data;
  };
};
