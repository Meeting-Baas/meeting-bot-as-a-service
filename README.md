# Meeting Bass 🐟 Integration Examples

This repository contains automation examples and code repositories that either:

1. Send Meeting Bots to Google Meet, Zoom and Microsoft Teams in an easy way.

2. Automate data extraction from meetings via LLMs and save on different platforms meeting.

It shows you easy ways to extract data from video meetings and create your own software or automation process.

## Available Setups

Examples are divided in 2: between sending data and handling it.
This is a bit arbitrary as some code examples handle both in one same example both (a) sending and (b) receiving the data.

### Sending Data: Apps & Simple Online Forms

**Tiny Meeting Bot Desktop App with Tauri**

- [View Tauri Desktop App Example](./apps/desktop-rust-app/)
  - A lightweight cross-platform desktop application to send Meeting Bots to Zoom, Google Meet, or Microsoft Teams meetings.

### Handling Data: Software and Automations

**NodeJS App with an online form and meeting data processing**

- [View NodeJS + Rust Example](./apps/rust-send-bots-form/)
  - Using NodeJS and express, create a simple app that:
    -- has a simple sharable page to send a meeting bot.
    -- has an automation process to summarize meeting transcriptions with OpenAI and publish formatted information to a Notion DataBase, with meta-data.

**n8n AI Meeting Bot**

- [View n8n Example](./to-other-apps/meeting-to-notion-with-n8n/)
  - Automate meeting transcription and Notion sync using n8n's visual workflow editor and the AI Meeting Bot API.

**Make AI Meeting Bot**

- [View Make Example](./to-other-apps/meeting-to-airtable-with-make/)
  - Sync meeting transcriptions to Airtable using Make's no-code platform and the AI Meeting Bot API.

**NodeJS App with an online form and meeting data processing**

- [View React + ThreeJS + Rust Example](./apps/rust-talking-blob/)
  - Using React with the ThreeJS library, packaged in a Rust app, create a talking blob that reacts to the sounf of the microphone.

Each setup guide provides step-by-step instructions to configure and use the respective technology stack with the AI Meeting Bot API, enabling efficient automation of meeting processes.

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
