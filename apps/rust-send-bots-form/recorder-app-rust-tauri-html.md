# Tiny Meeting Bot Desktop App with Tauri

This tutorial will guide you through setting up a tiny desktop app that can send a Meeting Bot to a Meeting.

Combined with a system to harmonize the collected notes (through your own software, Notion,....) it allows you to record desired meetings at scale by sharing a small app.

This simple example sends a bot to a meeting on Zoom, Google Meet or Microsoft Teams using your Meeting Bass 🐟 API key.
Of course, you may re-use this example to other ends (including commercial).

The app is built with Tauri and Rust and weighs 4.5MB.

Feel free to rename the app, change default values, ...

## Features

- Light-weight cross-platform desktop application (Windows, macOS, Linux)
- Integration with the Meeting Bass 🐟 API
- A simple form to input meeting details and send a bot to join a meeting

## Prerequisites

- Rust and Cargo installed on your machine
- Meeting Bass API key (You can obtain a free API key at [https://meetingbass.com](https://meetingbass.com))

## Step 1: Cloning the Repository

Clone the repository and navigate to the rust directory:

```bash
git clone
 https://github.com/Meeting-Baas/Meeting-Bot-As-A-Service
cd ./Meeting-Bot-As-A-Service/apps/apps/rust-send-bots-form/src-tauri/
```

## Step 2: Install Dependencies

Install the required Rust dependencies:

```bash
cargo build
```

## Step 3: Run the Application in Development Mode

To run the application in development mode, return one folder before, to `./Meeting-Bot-As-A-Service/apps/desktop-rust-app/.`.
And run:

```bash
cargo tauri dev
```

## Step 4: Customize the Application

You can rename the app, redistribute it and also change the default environment variables.

### App Name, Icon and Identifier

To change the app icon, change this file to an icns file with your icon: `icons/icon.icns`.
To rename the app identifier, modify the following lines in `./src-tauri/tauri.conf.json`:
`"productName": "meeting-to-desktop-app-with-code", `
` "title": "meeting-to-desktop-app-with-code",`
`... `
`"identifier": "com.Spoke.app",`
`"identifier": "com.Spoke.app",`

### Default API key and meeting bot options.

These variables can be stored in a `.env` file located in the `./src-tauri` directory.
This approach allows you to set default values for all users you share the app too.

Create a `.env` file in the `./src-tauri` directory and add the following variables:

```
BASS_API_KEY=your_api_key_here
BOT_NAME=your_bot_name_here
BOT_IMAGE_URL=https://example.com/bot-image.png
BOT_ENTRY_MESSAGE=Welcome! How can I assist you today?
```

You can view and create other environment variables by referring to our documentation:
[Meeting Baas Documentation](https://doc.meetingbaas.com/)

## Step 5: Build the Application for Production

To build the application for production:

```bash
cargo tauri build
```

This will create executable files for your operating system.

## Usage

1. Launch the application.
2. Enter the meeting URL in the provided field.
3. (Optional) Enter and save a (new) default bot name, bot image URL, entry message, and API key.
4. Click the "Submit" button to send the bot to the meeting.

## Troubleshooting

Join our [Discord](https://discord.gg/dsvFgDTr6c) if you run into any issues, and ping us there.
