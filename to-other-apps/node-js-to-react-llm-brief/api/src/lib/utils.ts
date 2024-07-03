import { Client, isFullDatabase, iteratePaginatedAPI } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import axios from "axios";
import { OpenAI } from "openai";

interface TranscriptEntry {
  speaker: string;
  words: Array<{
    start: number;
    end: number;
    word: string;
  }>;
}

interface JoinMeetingParams {
  meetingBotName?: string;
  meetingURL: string;
  meetingBotImage?: string;
  meetingBotEntryMessage?: string;
  apiKey: string;
}


const SYSTEM_PROMPT_SUMMARY = `Given a detailed transcript of a meeting, generate a concise summary that captures the key points, decisions made, and action items, formatted in Markdown for better readability and organization. Note: Do NOT include a date in the response.`;
const SYSTEM_PROMPT_TAGS = `Given a detailed transcript of a meeting, generate a concise summary that captures the key points, decisions made, and action items, formatted in Markdown for better readability and organization. Note: Do NOT include a date in the response.`;
const SYSTEM_PROMPT_DESCRIPTION = `Given a detailed transcript of a meeting, generate a concise summary that captures the key points, decisions made, and action items, formatted in Markdown for better readability and organization. Note: Do NOT include a date in the response.`;

export function checkEnvironmentVariables(): string[] {
  const requiredEnvVars = [
    "OPENAI_BASE_URL",
    "OPENAI_API_KEY",
    "OPENAI_MODEL",
    "NOTION_API_KEY",
    "DATABASE_ID",
    "BASS_API_KEY",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.warn(
      "⚠️ Warning: The following required environment variables are not set:"
    );
    missingVars.forEach((varName) => console.warn(`\t‼️ - ${varName}`));
    console.warn(
      "Please set these variables in your .env file or environment.",
      "\n\t- OPENAI_BASE_URL defaults to https://api.openai.com/v1",
      "\n\t- BASS_API_KEY can be set manually in the form."
    );
  }

  return missingVars;
}

// You can then use missingEnvVars in your HTML template to display warnings to the user
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
      }
    );

    console.log(`New bot created, with id: ${response.data?.bot_id}`);
    return { data: response.data };
  } catch (error: any) {
    console.error("Error joining meeting:", error);
    return { error: error.message || "Unknown error" };
  }
}

export async function summarizeTranscript(transcript: TranscriptEntry[]) {
  try {


if (process.env.OPENAI_API_KEY) {
  const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SYSTEM_PROMPT_DESCRIPTION },
      {
        role: "user",
        content: transcript
          .map(
            (entry: TranscriptEntry) =>
              `${entry.speaker}: ${entry.words
                .map((word) => word.word)
                .join(" ")}`
          )
          .join("\n"),
      },
    ],
  });

  return completion.choices[0].message.content;
  } else {
    return "OpenAI key is not set in Node JS."
  }

  } catch (error) {
    console.error("Error summarizing transcript:", error);
    return null;
  }
}

export async function createNotionPage(
  children: any, // no proper type available
  speakers: string[],
  now: Date
) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const DATABASE_ID = process.env.DATABASE_ID || "";
  if (!DATABASE_ID)
    throw new Error(
      "Missing Notion DATABASE_ID: Please verify that the DATABASE_ID is correctly set in your .env file."
    );

  try {
    // THIS IMPLIES YOUR NOTION Database contains the following Notion Database Schema:
    // - Name: title
    // - Description: rich_text
    // - MeetingDate: date (ISO)
    // - Attendees: multi_select

    // Create a new page in a Notion database
    const response = await notion.pages.create({
      // Set cover image (external URL)
      cover: {
        type: "external" as const,
        external: {
          url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
        },
      },

      // Set page icon (emoji)
      icon: {
        type: "emoji" as const,
        emoji: "🗣️",
      },

      // Specify parent database
      parent: {
        type: "database_id" as const,
        database_id: DATABASE_ID, // string
      },

      // Define page properties matching database schema
      properties: {
        // Title property (required)
        Name: {
          title: [
            {
              text: {
                content: `Meeting Summary - ${now.toISOString()}`, // string
              },
            },
          ],
        },

        // Rich text property
        Description: {
          rich_text: [
            {
              text: {
                content: "A meeting name", // string
              },
            },
          ],
        },

        // Date property
        MeetingDate: {
          date: {
            start: new Date().toISOString(), // string (ISO 8601 date)
          },
        },

        // Multi-select property
        Attendees: {
          multi_select: speakers.map((speaker) => ({ name: speaker })), // Array<{ name: string }>
        },
      },

      // Add child blocks to the page
      children: children, // Array of block objects
    });
    return { data: response };
  } catch (error: any) {
    console.error("Error creating Notion page:", error);
    return { error: error?.body || "Unknown error" };
  }
}

export async function listDatabases(
  notionClient: Client
): Promise<DatabaseObjectResponse[]> {
  const databases: DatabaseObjectResponse[] = [];
  console.log("\n\nlisting available Databases on NOTION:");

  try {
    for await (const page of iteratePaginatedAPI(notionClient.search, {
      filter: {
        property: "object",
        value: "database",
      },
    })) {
      if (isFullDatabase(page)) {
        databases.push(page);
        console.log(
          `- 📚 ${page.title[0]?.plain_text || "Untitled"}: ${page.id}`
        );
      } else {
        console.log("not a full database.");
      }
    }

    console.log(`Total databases found: ${databases.length}`, "\n\n");

    return databases;
  } catch (error) {
    console.error("Error listing databases:", error, "'\n\n");
    return [];
  }
}
