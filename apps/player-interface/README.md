# Video Player with Synchronized Transcript

This project is a React application that displays a video player with a synchronized transcript. The interface is divided into two main parts: the video player and the transcript.

## Features

- Video player with standard controls
- Display of transcript synchronized with the video
- Highlighting of the current word in the transcript
- Navigation through the video by clicking on words in the transcript
- Responsive interface with resizable split between player and transcript

## Main Components

### App.tsx
The main component that manages the global state and layout of the application.

### VideoPlayer.tsx
A wrapper around video.js to handle video playback.

### Transcript.tsx
Displays the transcript and manages synchronization with the video.

### Card.tsx
A reusable component for displaying content in a card format.

## Technologies Used

- React
- TypeScript
- Chakra UI for styling
- video.js for video playback

## Installation

1. Clone the repository
2. Install dependencies with `yarn install`
3. Run the application with `yarn dev`

## Usage

The application will automatically load a video and its transcript from mock data. The user can play the video and see the transcript synchronize automatically. Clicking on a word in the transcript will move the video to that specific moment.

## Customization

To use your own data, modify the `fakedata.json` file in the `fakeData` folder.

## Development

This project uses React with TypeScript. The main application logic is in `App.tsx`, which manages the state and layout. The `VideoPlayer` component handles video playback, while the `Transcript` component displays the synchronized transcript.

The interface is responsive and includes a resizable split between the video player and transcript sections on larger screens.

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.
