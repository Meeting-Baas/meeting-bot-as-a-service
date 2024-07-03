import * as React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export type MeetingInfo = {
  id: string;
  name: string;
  bot_id: string;
  attendees: string[];
  createdAt: Date;
};

function Meeting() {
  let { botId } = useParams();

  const [data, setData] = React.useState<MeetingInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get<MeetingInfo[]>(`/api/meeting/${botId}`);

      console.log("response", res);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Viewing Meeting - {botId}</h1>
      Hello World
    </div>
  )
}

export default Meeting;
