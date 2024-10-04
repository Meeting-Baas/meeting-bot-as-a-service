import './VideoPlayer.css'

import { useEffect, useRef } from 'react'

import {
    isHLSProvider,
    MediaPlayer,
    MediaProvider,
    Poster,
    type MediaPlayerInstance,
    type MediaProviderAdapter,
} from '@vidstack/react'
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'

interface PlayerProps {
    setPlayer: (player: MediaPlayerInstance) => void
    src: string
    onTimeUpdate: (time: number) => void
    assetTitle: string
}

export const VideoPlayer = ({
    setPlayer,
    src,
    onTimeUpdate,
    assetTitle,
}: PlayerProps) => {
    let player = useRef<MediaPlayerInstance>(null)

    useEffect(() => {
        // Subscribe to state updates.

        return player.current!.subscribe(({ currentTime, error }) => {
            onTimeUpdate(currentTime)

            if (error?.code === 3) {
                console.error('Oops! Something went wrong!')
            }
        })
    }, [])

    function onProviderChange(provider: MediaProviderAdapter | null) {
        // We can configure provider's here.
        if (isHLSProvider(provider)) {
            provider.library = () => import('hls.js')
        }
    }

    // We can listen for the `can-play` event to be notified when the player is ready.
    function onCanPlay() {
        setPlayer(player.current!)
    }

    return (
        <>
            <MediaPlayer
                className="player"
                title={assetTitle}
                src={src}
                crossOrigin
                playsInline
                onProviderChange={onProviderChange}
                onCanPlay={onCanPlay}
                ref={player}
            >
                <MediaProvider>
                    <Poster
                        className="vds-poster"
                        src="https://mordaklava.ch/stuff/vincent.png"
                    />
                </MediaProvider>

                {/* Layouts */}
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                    // thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                />
            </MediaPlayer>
        </>
    )
}
