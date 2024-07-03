import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Player as VideoPlayer } from "@/components/spoke/video-player/video-player";
import Transcript from "@/components/spoke/video-player/transcript";

export type MeetingInfo = {
  data: {
    id: string;
    name: string;
    editors: [
      {
        video: {
          transcripts: [
            {
              speaker: string;
              words: [
                {
                  start_time: number;
                  end_time: number;
                  text: string;
                }
              ];
            }
          ];
        };
      }
    ];
    meeting: {
      video_url: string;
    };
    assets: [
      {
        mp4_s3_path: string;
      }
    ];
  };
};

function Meeting() {
  let { botId } = useParams();

  const [data, setData] = React.useState<MeetingInfo>({
    data: {
      id: "",
      name: "",
      editors: [
        {
          video: {
            transcripts: [
              {
                speaker: "",
                words: [
                  {
                    start_time: 0,
                    end_time: 0,
                    text: "",
                  },
                ],
              },
            ],
          },
        },
      ],
      meeting: {
        video_url: "",
      },
      assets: [
        {
          mp4_s3_path: "",
        },
      ],
    },
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);

  const [transcripts, setTranscripts] = React.useState<any[]>([
    {
      speaker: "",
      words: [
        {
          start_time: 0,
          end_time: 0,
          text: "",
        },
      ],
    },
  ]);

  const fetchData = async () => {
    try {
      const res = await axios.get<MeetingInfo>(`/api/meeting/${botId}`);

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

  React.useEffect(() => {
    if (data?.data.editors.length > 0) {
      const editors = data?.data.editors;
      const transcripts: MeetingInfo["data"]["editors"][0]["video"]["transcripts"][0][] =
        [];
      editors.forEach((editor) => {
        transcripts.push(...editor.video.transcripts);
      });

      console.log(transcripts);
      setTranscripts(transcripts);
    }
  }, [data]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Viewing Meeting - {botId}</h1>
      {/* url={data?.data.assets[0].mp4_s3_path} */}
      {/* data?.data.editors[0].video.transcripts */}
      <div className="flex flex-col lg:flex-row my-4 gap-4">
        <div className="w-full h-full">
          <VideoPlayer
            // src={data?.data.meeting.video_url}
            onTimeUpdate={(time) => {
              setCurrentTime(time);
            }}
            // setPlayerRef={() => {}}
          />
        </div>
        <div className="max-h-[88vh] overflow-auto bg-muted rounded-md lg:w-1/2">
          {isLoading && <div className="flex items-center justify-center w-full h-full">Loading...</div>}
          <Transcript
            transcript={transcripts}
            currentTime={currentTime}
            onWordClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Meeting;
