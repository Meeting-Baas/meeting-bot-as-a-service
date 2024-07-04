import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Player as VideoPlayer } from "@/components/spoke/video-player/video-player";
import Transcript from "@/components/spoke/video-player/transcript";
import { MediaPlayerInstance, PlayerSrc } from "@vidstack/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
  const [player, setPlayer] = React.useState<MediaPlayerInstance>(null);

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

  const handleTimeUpdate = React.useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleSeek = React.useCallback(
    (time: number) => {
      if (player) {
        console.log(player);
      }
    },
    [player]
  );

  const setPlayerRef = React.useCallback((player: MediaPlayerInstance) => {
    setPlayer(player);
  }, []);

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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-col md:flex-row w-full mx-auto py-8 md:py-12"
      >
        <ResizablePanel defaultSize={55}>
          <div className="flex flex-1 rounded-l-lg overflow-hidden">
            <VideoPlayer
              // src={data?.data.meeting.video_url}
              src={"https://files.vidstack.io/sprite-fight/720p.mp4"}
              onTimeUpdate={handleTimeUpdate}
              setPlayer={setPlayerRef}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45}>
          <div className="flex-1 bg-background rounded-r-lg border p-6 md:p-8 space-y-2 min-h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Meeting Transcript
              </h2>
              {/* <p className="text-muted-foreground">
              A detailed transcript of the video meeting.
            </p> */}
            </div>
            {isLoading && (
              <div className="flex items-center justify-center w-full h-full">
                Loading...
              </div>
            )}
            <Transcript
              transcript={transcripts}
              currentTime={currentTime}
              onWordClick={handleSeek}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Meeting;
