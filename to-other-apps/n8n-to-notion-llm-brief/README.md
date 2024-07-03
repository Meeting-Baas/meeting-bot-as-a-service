# Meeting to Notion with n8n

This repository contains an n8n workflow to record video meetings, transcribe and summarize them, and sync the data to a Notion page. It uses the OpenAI API for data analysis and the AI Meeting Bot API for video meeting recording.

## Setup

To set up the workflow:

1. Follow the [setup guide](./n8n-to-notion-llm-brief.md).
2. Create an AI Meeting Bot API key.
3. Create an OpenAI API key.
4. Create a Notion integration and get the API key.
5. Import the n8n workflow and set the API keys.
6. Activate the workflow.

## Usage

To use the workflow:

1. Schedule a meeting in your calendar.
2. The workflow will automatically record the meeting.
3. The recording will be transcribed and summarized.
4. The summary will be added to a Notion page.

## Documentation

- [AI Meeting Bot API Reference](https://aimeetingbot.com/baas/reference)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Notion API Reference](https://developers.notion.com/reference/intro)
- [n8n Documentation](https://docs.n8n.io/)

## Other Examples

For other integration examples, see the [main README](../README.md).