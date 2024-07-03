# Talking Blob

A minimalist desktop application featuring a blob that reacts to microphone input.

## Overview

This application is built using Rust with Tauri for the backend, React for the frontend, and ThreeJS for 3D rendering. It provides a simple, interactive experience where a blob responds to sound detected by the microphone.

## Features

- Cross-platform desktop application (Windows, macOS, Linux)
- Real-time blob animation reacting to microphone input
- Lightweight and efficient

## Prerequisites

- Rust and Cargo installed on your system
- Node.js and yarn for frontend dependencies

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Meeting-Baas/Meeting-Bot-As-A-Service
cd ./Meeting-Bot-As-A-Service/apps/apps/rust-talking-blob/src-tauri/
```

2. Install dependencies:

```bash
cargo build
npm install
```

3. Run the application in development mode:

```bash
cargo tauri dev
```

## Building for Production

To create a production build:

```bash
cargo tauri build
```

This will generate executable files for your operating system.

## Distribution

To distribute this app to end users, you'll need to sign it to prevent OS warnings during installation. Refer to the Tauri documentation for platform-specific signing instructions.

## Usage

1. Launch the application
2. Grant microphone permissions if prompted
3. Speak or make sounds to see the blob react

## Troubleshooting

Join our [Discord](https://discord.gg/dsvFgDTr6c) if you run into any issues, and ping us there.
