import axios from "axios";

export interface JoinMeetingParams {
  meetingBotName?: string;
  meetingURL: string;
  meetingBotImage?: string;
  meetingBotEntryMessage?: string;
  apiKey: string;
}

export async function joinMeeting({
  meetingBotName,
  meetingURL,
  meetingBotImage,
  meetingBotEntryMessage,
  apiKey,
}: JoinMeetingParams) {
  try {
    const response = await axios.post(
      "https://api.meetingbaas.com/bots",
      // dev environement for Bass people ;))
      // "http://127.0.0.1:3001/bots",
      {
        meeting_url: meetingURL,
        bot_name: meetingBotName || "NodeJS Meeting Bot",
        entry_message:
          meetingBotEntryMessage || "Hello - recording this meeting",
        bot_image:
          meetingBotImage ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1180px-Node.js_logo.svg.png",
        speech_to_text: "Gladia",
        reserved: false,
      },
      {
        headers: {
          "x-spoke-api-key": apiKey || process.env.BASS_API_KEY,
        },
      },
    );

    console.log(`New bot created, with id: ${response.data?.bot_id}`);
    return { data: response.data };
  } catch (error: any) {
    console.error("Error joining meeting:", error);
    return { error: error.message || "Unknown error" };
  }
}
