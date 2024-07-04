import "./player.css";

import { useEffect, useRef, useState } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  useMediaRemote,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  useMediaProvider,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface PlayerProps {
  setPlayer: (player: MediaPlayerInstance) => void;
  src: string;
  onTimeUpdate: (time: number) => void;
}

export function Player({ setPlayer, src, onTimeUpdate }: PlayerProps) {
  let player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // Subscribe to state updates.

    return player.current!.subscribe(({ paused, viewType, currentTime }) => {
      console.log("current time", "->", currentTime);
      onTimeUpdate(currentTime);
      //   console.log('is paused?', '->', paused);
      // console.log('is audio view?', '->', viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    setPlayer(player.current!);
    // ...
  }

  return (
    <>
      <MediaPlayer
        className="player"
        title="Sprite Fight"
        src={src}
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        onProgress={(detail) => {
          console.log("progress", "->", detail);
        }}
        ref={player}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src="https://files.vidstack.io/sprite-fight/poster.webp"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        </MediaProvider>

        {/* Layouts */}
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        />
      </MediaPlayer>
    </>
  );
}
