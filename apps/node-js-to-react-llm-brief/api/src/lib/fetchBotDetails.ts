import axios from "axios";

export interface BotDetailsParams {
  botId: string;
  apiKey: string;
}

export async function fetchBotDetails({ botId, apiKey }: BotDetailsParams) {
  try {
    const response = await axios.get(
      "https://api.meetingbaas.com/bots/meeting_data",
      // dev environement for Bass people ;))
      // "http://127.0.0.1:3001/bots/meeting_data",
      {
        params: {
          bot_id: botId,
        },
        headers: {
          "x-spoke-api-key": apiKey || process.env.BASS_API_KEY,
        },
      },
    );

    console.log(`Bot details fetched, with id: ${response.data?.id}`);
    return { data: response.data };
  } catch (error: any) {
    console.error("Error joining meeting:", error);
    return { error: error.message || "Unknown error" };
  }
}
