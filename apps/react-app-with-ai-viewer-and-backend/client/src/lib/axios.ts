import {
  fetchBotDetails,
  joinMeeting,
  JoinMeetingParams,
} from "@meeting-baas/shared";
import axios from "axios";
import { MeetingInfo } from "./utils";

interface JoinMeetingWrapperProps {
  baasApiKey: string;
  serverAvailability: "server" | "local" | "error";
  params: JoinMeetingParams;
}

interface FetchBotDetailsWrapperProps {
  baasApiKey: string;
  serverAvailability: "server" | "local" | "error";
  botId: string;
  raw?: boolean;
}

export const joinMeetingWrapper = async ({
  baasApiKey,
  serverAvailability,
  params,
}: JoinMeetingWrapperProps) => {
  if (serverAvailability === "server") {
    return await axios.post("/api/join", params);
  } else {
    console.log("passing the request through proxy on vite to bypass CORS...");
    return await joinMeeting({
      ...params,
      apiKey: baasApiKey,
      proxyUrl: "/meetingbaas-api",
    });
  }
};

export const fetchBotDetailsWrapper = async ({
  baasApiKey,
  serverAvailability,
  botId,
  raw,
}: FetchBotDetailsWrapperProps) => {
  if (serverAvailability === "server") {
    const response = await axios.get(`/api/meeting/${botId}`);
    const data: MeetingInfo['data'] = response.data['data'];

    if (!raw) {
      return {
        data: {
          id: data.id,
          name: "New Meeting",
          attendees: data["attendees"].map((attendee: { name: string }) => {
            return attendee.name;
          }),
          createdAt: new Date(
            data.created_at.secs_since_epoch * 1000 +
              data.created_at.nanos_since_epoch / 1000000
          ),
        },
      };
    }

    return {
      data: response.data
    };

  } else {
    console.log("passing the request through proxy on vite to bypass CORS...");
    const response = await fetchBotDetails({
      botId,
      apiKey: baasApiKey,
      proxyUrl: "/meetingbaas-api",
    });
    const data = response.data;

    if (!raw) {
      return {
        data: {
          id: data.id,
          name: "New Meeting",
          attendees: data["attendees"].map((attendee: { name: string }) => {
            return attendee.name;
          }),
          createdAt: new Date(
            data.created_at.secs_since_epoch * 1000 +
              data.created_at.nanos_since_epoch / 1000000
          ),
        },
      };
    }

    return {
      data: {
        data: data
      }
    };
  }
};
