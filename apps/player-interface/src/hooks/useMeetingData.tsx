import { useEffect, useState } from 'react'

import axios from 'axios'
import { MeetingInfo } from '../type'

// const API_URL = 'https://api.meetingbaas.com'
const API_URL = 'http://localhost:3001'
const API_KEY = 'banane'
const useMeetingData = (botId: string) => {
    const [meetingData, setMeetingData] = useState<MeetingInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await axios.get<MeetingInfo>(
                    `${API_URL}/bots/meeting_data`,
                    {
                        params: { bot_id: botId },
                        headers: {
                            'x-spoke-api-key': API_KEY,
                        },
                    },
                )
                setMeetingData(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch meeting data')
                setLoading(false)
            }
        }

        fetchMeetingData()
    }, [botId])

    return { meetingData, loading, error }
}

export default useMeetingData
