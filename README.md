<p align="center"><a href="https://discord.com/invite/dsvFgDTr6c"><img height="60px" src="https://user-images.githubusercontent.com/31022056/158916278-4504b838-7ecb-4ab9-a900-7dc002aade78.png" alt="Join our Discord!"></a></p>

# 🐟 Meeting Baas 🐟 Integration Examples

![Header](./GithubPreview.png)

Using [Meeting Baas' API](https://meetingbaas.com/) to get recordings and meta-data from [Google Meet](https://meet.google.com/), [Zoom](https://zoom.us/) and [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/log-in), transcription APIs and LLM APIs, this repository contains _open-source examples to view and handle conversation or (video) meeting data_.

## Available Setups

Examples are divided in 2:

1. **Stand-alone examples using code** which include:

   - A basic React open-source transcript viewer, with a synchronized video player and transcript
   - A complete backend and frontend app, which includes a sophisticated transcript viewer (complete a component to "AI-Chat" with your meeting, and another to add notes), a form to upload a file, a list of conversations, ...
   - A

2. **Integrations using third-party software**, whether said software is open-source or not. So of course [make.com](https://make.com/), [n8n.io](https://n8n.io/) integrations, but also a Google Calendar form to invite a bot to meeting to record it which you can share with a team, ...

## Apps & Data-Handling

Learn how to invite meeting bots to a meeting for yourself or your users, and view examples to start handling the data quickly.

**[Complete Open-Source Backend and Frontend Conversation Viewer](./apps/react-app-with-ai-viewer-and-backend/)**

- A comprehensive project with three main pages:

  1. Bot Invitation: Easily invite bots to your meetings

  2. Conversation View: Browse and interact with all your meetings or any conversation

  3. Settings: Manage your API keys and other configurations

- Features a full-stack implementation with a simple backend and a stand-alone frontend interface. In stand-alone mode the app uses Local Storage from the browser to store information.
- Technologies used:
  - Backend: Node.js, Express
  - Frontend: React, TypeScript, TailwindCSS
  - Media Playback: Vidstack

This project provides a complete solution for managing meeting bots, viewing conversations, and handling API integrations, all within a modern and responsive web application.

**[Transcript Player Interface](./apps/player-interface/)**

- This project is a web application that displays a video player with a synchronized transcript. The interface is divided into two main parts: the video player and the transcript.
- Technologies used: Node, React, Typescript, Chakra.

**[Desktop App to invite a bot](./apps/rust-send-bots-form/)**

- A cross-platform desktop application with a simple user-input form to send Meeting Bots to [Zoom](https://zoom.us/), [Google Meet](https://meet.google.com/), or [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/log-in) meetings.
- Technologies used: Rust, Tauri, HTML, Javascript.

**[WebApp and Server to record and handle data](./apps/node-js-to-notion-llm-brief/)**

- A simple web app that:
  - Has a simple sharable page to send a meeting bot.
  - Has an automation process to summarize meeting transcriptions with [OpenAI](https://openai.com/) and publish formatted information to a [Notion](https://www.notion.so/) DataBase, with meta-data.
- Technologies used: ExpressJS, Node.
- Third-parties used: [OpenAI](https://openai.com/), [Notion](https://www.notion.so/).

**[Talking Blob](./apps/rust-talking-blob/)**

- Slightly off-topic: an animated blob packaged a desktop app. It simply reacts to microphone input :)
- Technologies used: Node, React, ThreeJS, Rust, Tauri.

## Automations relying on third-party software

Automate data extraction from [Google Meet](https://meet.google.com/), [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/log-in), and [Zoom](https://zoom.us/) using third party, "no-code" software.

**[View n8n Example](./to-other-apps/meeting-to-notion-with-n8n/)**

- Automate meeting transcription and [Notion](https://www.notion.so/) sync using [n8n's](https://n8n.io/) visual workflow editor and the [Meeting Baas API](https://doc.meetingbaas.com/).

**[View Make Example](./to-other-apps/meeting-to-airtable-with-make/)**

- Sync meeting transcriptions to Airtable using [Make's](https://make.com/) no-code platform and the [Meeting Baas API](https://doc.meetingbaas.com/).

## Contributing && Troubleshooting

Join our [Discord](https://discord.gg/dsvFgDTr6c) if you run into any issues, and ping us there.

Contributions to this repository directly here on Github are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes, following the established coding standards.
4. Include appropriate documentation for your changes.
5. Submit a pull request, describing your changes in detail.

For any suggestions or enhancements, please open an issue in the repository.
