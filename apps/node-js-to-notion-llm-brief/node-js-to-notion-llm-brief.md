# Using Meeting Bots As A Service to send transcript summaries to Notion with Node.

This tutorial will guide you through setting up a Node.js application that integrates AI Meeting Bot, OpenAI, and Notion to automate notes and data extraction from meetings on Zoom, Google Meet and Microsoft Teams.
The app provides:

- A webpage to send a meeting bot for recording and transcribing meetings
- A server with a webhook to receive data and process it
- Integration with Notion and OpenAI for meeting summaries and data storage

When deployed, team members can share a link to invite the meeting bot and receive AI-generated summaries in Notion.

## Prerequisites

- Node.js installed on your machine or deployment target
- API keys for Meeting Bass and OpenAI
- Access token and database ID for Notion

## Step 0: Pre-requisites

### Meeting Bass

Obtain your API key from [https://meetingbaas.com/bass](https://meetingbaas.com/bass)

### OpenAI

Get your OpenAI key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

The default prompt for meeting summarization is:

> `Given a detailed transcript of a meeting, generate a concise summary that captures the key points, decisions made, and action items, formatted in Markdown for better readability and organization. Note: Do NOT include a date in the response.`

Feel free to adapt this prompt to your needs.

### Notion

Follow the [Notion integration guide](https://developers.notion.com/docs/create-a-notion-integration) to create a Notion Access Token.

**Important:** Set up the integration on the database page itself (right-click on the top right of the page, click on "Connections").

The example requires a Notion database with the following schema:

- Name: title
- Description: rich_text
- MeetingDate: date (ISO)
- Attendees: multi_select

You can modify this schema as needed.

## Step 1: Cloning the Repository

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Lazare42/baas-examples-internal.git
cd baas-examples-internal/node-js-to-notion-llm-brief
```

## Step 2: Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

## Step 3: Configure Environment Variables

Copy `.env.example` to `.env` in the project root and populate it with your API keys and tokens:

```
# MeetingBass
BASS_API_KEY=""

# OpenAI
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-3.5-turbo"
OPENAI_BASE_URL="https://api.openai.com/v

# Notion
NOTION_API_KEY=""
DATABASE_ID=""

```

Replace the placeholders with your actual keys and tokens.

## Step 4: Build the Application

Build the application:

```bash
npm run build
```

## Step 5: Start the Server

Start the server:

```bash
npm start
```

## Step 6: Set Your Webhook Destination in Meeting Bass

Connect AI Meeting Bot to your Node.js application:

1. Copy the URL where your app is running.
2. Navigate to the **Webhook Tab** in Meeting Bass.
3. Enter the copied URL into the **Webhook** field.

## Step 7: Test Your Setup

To test your configuration:

1. Open the form and enter the meeting URL and AI Meeting Bot API Key.
2. Run a test to ensure everything works correctly.

## Final Thoughts

Your setup is now complete. This configuration automates meeting management tasks, leveraging AI to capture and analyze conversations efficiently. If you encounter any issues, refer back to this guide and consult the respective API documentation for troubleshooting.
