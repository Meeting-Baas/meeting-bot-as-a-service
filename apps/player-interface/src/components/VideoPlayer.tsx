import 'video.js/dist/video-js.css'
import './VideoPlayer.css'

import React, { useEffect, useRef, useState } from 'react'

import videojs from 'video.js'
import Player from 'video.js/dist/types/player'

interface VideoPlayerProps {
    url: string
    onTimeUpdate: (time: number) => void
    setPlayerRef?: (player: Player) => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    url,
    onTimeUpdate,
    setPlayerRef,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<Player | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

    useEffect(() => {
        if (isMounted && videoRef.current && !playerRef.current) {
            const player = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: true,
            })

            player.src(url)
            playerRef.current = player
            if (setPlayerRef) {
                setPlayerRef(player)
            }

            player.on('timeupdate', () => {
                const currentTime = player.currentTime()
                if (typeof currentTime === 'number') {
                    onTimeUpdate(currentTime)
                }
            })

            // Ajoutez un bouton de contrôle de vitesse
            const speedButton = player
                .getChild('controlBar')
                ?.addChild('button', {
                    clickHandler: function () {
                        const currentRate = player.playbackRate()
                        const newRate =
                            currentRate! >= 2 ? 1 : currentRate! + 0.5
                        player.playbackRate(newRate)
                        updateSpeedButtonText(newRate)
                    },
                })

            // Fonction pour mettre à jour le texte du bouton de vitesse
            function updateSpeedButtonText(rate: number) {
                if (speedButton && speedButton.el()) {
                    speedButton.el().textContent = `${rate}x`
                }
            }

            // Initialisation du texte du bouton
            updateSpeedButtonText(1)

            return () => {
                player.dispose()
                playerRef.current = null
            }
        }
    }, [url, onTimeUpdate, isMounted, setPlayerRef])

    return (
        <div data-vjs-player>
            <video
                style={{ borderRadius: '10px' }}
                ref={videoRef}
                className="video-js vjs-big-play-centered"
                playsInline
            />
        </div>
    )
}
