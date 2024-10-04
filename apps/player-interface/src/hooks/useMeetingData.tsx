import { useEffect, useState } from 'react'

import axios from 'axios'
import { MeetingInfo } from '../type'

const API_URL = 'http://127.0.0.1:3001'

const useMeetingData = (botId: string | null, apiKey: string | null) => {
    const [meetingData, setMeetingData] = useState<MeetingInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!botId || !apiKey) {
            return
        }

        setLoading(true)
        setError(null)

        const fetchMeetingData = async () => {
            console.log('Fetching meeting data for botId:', botId)
            try {
                const response = await axios.get<MeetingInfo>(
                    `${API_URL}/bots/meeting_data`,
                    {
                        params: { bot_id: botId },
                        headers: {
                            'x-spoke-api-key': apiKey,
                        },
                    },
                )
                console.log('Response received:', response.data)
                setMeetingData(response.data)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching meeting data:', err)
                setError('Failed to fetch meeting data')
                setLoading(false)
            }
        }

        fetchMeetingData()
    }, [botId, apiKey])

    return { meetingData, loading, error }
}

export default useMeetingData
